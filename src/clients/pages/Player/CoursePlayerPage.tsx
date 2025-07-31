import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Row, Col, Breadcrumb, Button, Space, Dropdown, Typography, Spin, Alert } from 'antd';
import { HomeOutlined, MoreOutlined, BookOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import LessonTabs from '../../components/LessonTabs/LessonTabs';
import SectionSidebar from '../../components/SectionSidebar/SectionSidebar';
import { usePlayCourse } from '../../../hooks/usePlayCourse';
import type { PlaySection } from '../../../types/playCourse';
import './CoursePlayerPage.scss';

const { Title } = Typography;

// Extend the existing Lesson interface to be compatible with PlayLesson
interface Lesson {
    id: string;
    title: string;
    type: 'video' | 'exercise';
    duration: string;
    completed: boolean;
    videoUrl?: string;
    description: string;
    objectives: string[];
}

// Extend the existing Section interface to be compatible with PlaySection
interface Section {
    id: string;
    title: string;
    totalLessons: number;
    completedLessons: number;
    lessons: Lesson[];
}

// Function to convert API data to component format
const convertApiDataToComponentFormat = (apiSections: PlaySection[]): Section[] => {
    return apiSections.map(section => ({
        id: section.id.toString(),
        title: section.title,
        totalLessons: section.lessons.length,
        completedLessons: section.lessons.filter(lesson => lesson.completed).length,
        lessons: section.lessons.map(lesson => ({
            id: lesson.id.toString(),
            title: lesson.title,
            type: 'video' as const,
            duration: '00:00', // API doesn't provide duration, using default
            completed: lesson.completed,
            videoUrl: lesson.videoUrl,
            description: `Bài học: ${lesson.title}`,
            objectives: [`Hoàn thành bài học ${lesson.title}`]
        }))
    }));
};

const CoursePlayerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const courseId = id ? parseInt(id) : 102; // Default to 102 if no ID in URL

    // Fetch course data from API
    const { playCourseData, loading, error } = usePlayCourse(courseId);

    // Convert API data to component format using useMemo
    const sections = useMemo(() => {
        return playCourseData?.data ? convertApiDataToComponentFormat(playCourseData.data) : [];
    }, [playCourseData]);

    // Set default lesson - first lesson of first section if available
    const defaultLesson = useMemo(() => {
        return sections.length > 0 && sections[0].lessons.length > 0 ? sections[0].lessons[0] : null;
    }, [sections]);

    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [sectionsState, setSectionsState] = useState<Section[]>([]);

    // Update sections state when API data loads
    useEffect(() => {
        if (sections.length > 0) {
            setSectionsState(sections);
        }
    }, [sections]);

    // Update current lesson when data loads
    useEffect(() => {
        if (defaultLesson && !currentLesson) {
            setCurrentLesson(defaultLesson);
        }
    }, [defaultLesson, currentLesson]);

    const handleLessonSelect = useCallback((lesson: Lesson) => {
        setCurrentLesson(lesson);
    }, []);

    // Handle toggle lesson completion
    const handleLessonToggleComplete = useCallback((lessonId: string, completed: boolean) => {
        setSectionsState(prevSections => {
            return prevSections.map(section => {
                const updatedLessons = section.lessons.map(lesson => {
                    if (lesson.id === lessonId) {
                        return { ...lesson, completed };
                    }
                    return lesson;
                });

                // Recalculate completed lessons count
                const completedLessons = updatedLessons.filter(lesson => lesson.completed).length;

                return {
                    ...section,
                    lessons: updatedLessons,
                    completedLessons
                };
            });
        });

        // Update current lesson if it's the one being toggled
        setCurrentLesson(prevLesson => {
            if (prevLesson && prevLesson.id === lessonId) {
                return { ...prevLesson, completed };
            }
            return prevLesson;
        });

        // Here you can add API call to persist the change
        console.log(`Lesson ${lessonId} completion status changed to: ${completed}`);
        // TODO: Call API to update lesson completion status
        // updateLessonCompletion(lessonId, completed);
    }, []);

    // Handle loading state
    if (loading) {
        return (
            <div className="course-player-page">
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <Spin size="large" />
                    <div style={{ marginTop: 16 }}>Đang tải khóa học...</div>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="course-player-page">
                <div style={{ padding: '50px 0' }}>
                    <Alert
                        message="Lỗi"
                        description={error}
                        type="error"
                        showIcon
                    />
                </div>
            </div>
        );
    }

    // Handle no lesson selected
    if (!currentLesson) {
        return (
            <div className="course-player-page">
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <Alert
                        message="Thông báo"
                        description="Không có bài học nào để hiển thị"
                        type="info"
                        showIcon
                    />
                </div>
            </div>
        );
    }

    const courseMenuItems = [
        {
            key: 'bookmark',
            label: 'Đánh dấu trang này'
        },
        {
            key: 'download',
            label: 'Tải xuống bài học'
        },
        {
            key: 'share',
            label: 'Chia sẻ'
        },
        {
            key: 'report',
            label: 'Báo cáo vấn đề'
        }
    ];

    return (
        <div className="course-player-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <HomeOutlined />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/list-course">
                            <BookOutlined />
                            <span>Khóa học</span>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>React TypeScript Masterclass</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {/* Course Header */}
            <div className="course-header">
                <div className="course-info">
                    <Title level={3}>React TypeScript Masterclass</Title>
                    <Space>
                        <Button type="primary">Tiếp tục học</Button>
                        <Dropdown menu={{ items: courseMenuItems }} placement="bottomRight">
                            <Button icon={<MoreOutlined />} />
                        </Dropdown>
                    </Space>
                </div>
            </div>

            {/* Main Content */}
            <Row gutter={[24, 24]} className="course-content">
                {/* Left Column - Video Player and Tabs */}
                <Col xs={24} lg={16} className="video-column">
                    <div className="video-section">
                        {currentLesson.type === 'video' && currentLesson.videoUrl ? (
                            <VideoPlayer
                                key={currentLesson.id} // Force re-mount when lesson changes
                                videoUrl={currentLesson.videoUrl}
                                autoPlay={false}
                                poster="https://via.placeholder.com/800x450.png?text=Loading+Video..."
                                onReady={() => console.log(`Bài học "${currentLesson.title}" đã sẵn sàng!`)}
                            />
                        ) : (
                            <div className="exercise-placeholder">
                                <div className="exercise-content">
                                    <Title level={4}>📝 Bài tập: {currentLesson.title}</Title>
                                    <p>{currentLesson.description}</p>
                                    <Button type="primary" size="large">
                                        Bắt đầu bài tập
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <LessonTabs currentLesson={currentLesson} />
                </Col>

                {/* Right Column - Course Sidebar */}
                <Col xs={24} lg={8} className="sidebar-column">
                    <SectionSidebar
                        sections={sectionsState.length > 0 ? sectionsState : sections}
                        onLessonSelect={handleLessonSelect}
                        onLessonToggleComplete={handleLessonToggleComplete}
                        currentLessonId={currentLesson?.id}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default CoursePlayerPage;
