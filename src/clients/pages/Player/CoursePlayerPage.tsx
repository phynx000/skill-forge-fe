import React, { useState, useCallback } from 'react';
import { Row, Col, Breadcrumb, Button, Space, Dropdown, Typography } from 'antd';
import { HomeOutlined, MoreOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import LessonTabs from '../../components/LessonTabs/LessonTabs';
import SectionSidebar from '../../components/SectionSidebar/SectionSidebar';
import './CoursePlayerPage.scss';

const { Title } = Typography;

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

interface Section {
    id: string;
    title: string;
    totalLessons: number;
    completedLessons: number;
    lessons: Lesson[];
}

const CoursePlayerPage: React.FC = () => {
    // Mock data with HLS video URLs
    const mockSections: Section[] = [
        {
            id: '1',
            title: 'Giới thiệu React TypeScript',
            totalLessons: 4,
            completedLessons: 2,
            lessons: [
                {
                    id: '1-1',
                    title: 'Tổng quan về React và TypeScript',
                    type: 'video',
                    duration: '15:30',
                    completed: false,
                    videoUrl: 'https://vz-11106c72-014.b-cdn.net/bcdn_token=7v5gKQgUlg9R0M4_IxX10iKkhyhWqF1rQdTu9dEXyBk&expires=1753757015&token_path=%2F7a34ccd6-6143-4bd0-a976-493dc83863ae%2F/7a34ccd6-6143-4bd0-a976-493dc83863ae/playlist.m3u8',
                    description: 'Trong bài học này, chúng ta sẽ tìm hiểu tổng quan về React và TypeScript, cách chúng kết hợp với nhau để tạo ra những ứng dụng web mạnh mẽ.',
                    objectives: [
                        'Hiểu được React là gì và tại sao nên sử dụng',
                        'Nắm được TypeScript và lợi ích của nó',
                        'Biết cách kết hợp React với TypeScript',
                        'Thiết lập môi trường phát triển cơ bản'
                    ]
                },
                {
                    id: '1-2',
                    title: 'Cài đặt môi trường phát triển',
                    type: 'video',
                    duration: '12:45',
                    completed: true,
                    videoUrl: 'https://vz-11106c72-014.b-cdn.net/ab36f7af-95f6-463b-adcb-cf6882221e61/playlist.m3u8',
                    description: 'Hướng dẫn chi tiết cách cài đặt và cấu hình môi trường phát triển React TypeScript.',
                    objectives: [
                        'Cài đặt Node.js và npm',
                        'Tạo project React với TypeScript',
                        'Cấu hình VS Code cho React TypeScript',
                        'Cài đặt các extension hữu ích'
                    ]
                },
                {
                    id: '1-3',
                    title: 'Bài tập: Tạo component đầu tiên',
                    type: 'exercise',
                    duration: '30:00',
                    completed: false,
                    description: 'Thực hành tạo component React TypeScript đầu tiên của bạn.',
                    objectives: [
                        'Tạo functional component với TypeScript',
                        'Sử dụng Props với type safety',
                        'Hiểu về JSX trong TypeScript',
                        'Export và import components'
                    ]
                },
                {
                    id: '1-4',
                    title: 'State và Props trong TypeScript',
                    type: 'video',
                    duration: '18:20',
                    completed: false,
                    videoUrl: 'https://vz-11106c72-014.b-cdn.net/b3f95de8-1234-5678-9abc-def012345678/playlist.m3u8',
                    description: 'Tìm hiểu cách sử dụng State và Props với type safety trong React TypeScript.',
                    objectives: [
                        'Định nghĩa types cho Props',
                        'Sử dụng useState với TypeScript',
                        'Generic types trong React',
                        'Best practices cho typing'
                    ]
                }
            ]
        },
        {
            id: '2',
            title: 'Hooks và State Management',
            totalLessons: 5,
            completedLessons: 0,
            lessons: [
                {
                    id: '2-1',
                    title: 'useState và useEffect với TypeScript',
                    type: 'video',
                    duration: '20:15',
                    completed: false,
                    videoUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
                    description: 'Học cách sử dụng useState và useEffect hooks với TypeScript.',
                    objectives: [
                        'Typing useState hooks',
                        'useEffect dependencies typing',
                        'Custom hooks với TypeScript',
                        'Error handling trong hooks'
                    ]
                },
                {
                    id: '2-2',
                    title: 'Custom Hooks nâng cao',
                    type: 'video',
                    duration: '25:30',
                    completed: false,
                    videoUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
                    description: 'Tạo và sử dụng custom hooks phức tạp với TypeScript.',
                    objectives: [
                        'Tạo reusable custom hooks',
                        'Generic trong custom hooks',
                        'Performance optimization',
                        'Testing custom hooks'
                    ]
                },
                {
                    id: '2-3',
                    title: 'Context API với TypeScript',
                    type: 'video',
                    duration: '22:45',
                    completed: false,
                    videoUrl: 'https://vz-11106c72-014.b-cdn.net/ab36f7af-95f6-463b-adcb-cf6882221e61/playlist.m3u8',
                    description: 'Quản lý state global với Context API và TypeScript.',
                    objectives: [
                        'Tạo typed Context',
                        'Provider và Consumer patterns',
                        'useContext với TypeScript',
                        'Context performance optimization'
                    ]
                },
                {
                    id: '2-4',
                    title: 'Bài tập: Todo App với Hooks',
                    type: 'exercise',
                    duration: '45:00',
                    completed: false,
                    description: 'Xây dựng ứng dụng Todo hoàn chỉnh sử dụng Hooks và TypeScript.',
                    objectives: [
                        'CRUD operations với hooks',
                        'Local storage integration',
                        'Form handling với TypeScript',
                        'Component composition'
                    ]
                },
                {
                    id: '2-5',
                    title: 'Redux Toolkit với TypeScript',
                    type: 'video',
                    duration: '28:10',
                    completed: false,
                    videoUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
                    description: 'Tích hợp Redux Toolkit với React TypeScript cho state management phức tạp.',
                    objectives: [
                        'Setup Redux Toolkit với TypeScript',
                        'Typed slices và actions',
                        'useSelector và useDispatch typing',
                        'Async thunks với TypeScript'
                    ]
                }
            ]
        },
        {
            id: '3',
            title: 'Styling và UI Libraries',
            totalLessons: 3,
            completedLessons: 0,
            lessons: [
                {
                    id: '3-1',
                    title: 'CSS Modules và Styled Components',
                    type: 'video',
                    duration: '19:25',
                    completed: false,
                    videoUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
                    description: 'Các phương pháp styling hiện đại trong React TypeScript.',
                    objectives: [
                        'CSS Modules setup',
                        'Styled Components với TypeScript',
                        'Theme typing',
                        'Responsive design patterns'
                    ]
                },
                {
                    id: '3-2',
                    title: 'Ant Design với TypeScript',
                    type: 'video',
                    duration: '24:40',
                    completed: false,
                    videoUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
                    description: 'Sử dụng Ant Design components với type safety.',
                    objectives: [
                        'Ant Design TypeScript integration',
                        'Custom theme configuration',
                        'Form handling với Ant Design',
                        'Table và Data Display components'
                    ]
                },
                {
                    id: '3-3',
                    title: 'Bài tập: Dashboard Admin',
                    type: 'exercise',
                    duration: '60:00',
                    completed: false,
                    description: 'Xây dựng dashboard admin hoàn chỉnh với Ant Design và TypeScript.',
                    objectives: [
                        'Layout design patterns',
                        'Data visualization',
                        'Form validation',
                        'Responsive admin interface'
                    ]
                }
            ]
        }
    ];

    const [currentLesson, setCurrentLesson] = useState<Lesson>(mockSections[0].lessons[0]);

    const handleLessonSelect = useCallback((lesson: Lesson) => {
        setCurrentLesson(lesson);
    }, []);

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
                                videoUrl={currentLesson.videoUrl}
                                autoPlay={false} // Đặt là true nếu bạn muốn tự động phát
                                poster="https://via.placeholder.com/800x450.png?text=Loading+Video..." // URL ảnh bìa
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
                        sections={mockSections}
                        onLessonSelect={handleLessonSelect}
                        currentLessonId={currentLesson.id}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default CoursePlayerPage;
