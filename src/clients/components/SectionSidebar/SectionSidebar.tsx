import React, { useState, useEffect } from 'react';
import {
    Collapse,
    List,
    Typography,
    Progress,
    Badge,
    Space,
    Button,
    Checkbox
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import {
    PlayCircleOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import './SectionSidebar.scss';

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface Lesson {
    id: string;
    title: string;
    type: 'video' | 'exercise';
    duration: string;
    completed: boolean;
    current?: boolean;
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

interface SectionSidebarProps {
    sections: Section[];
    onLessonSelect: (lesson: Lesson) => void;
    onLessonToggleComplete?: (lessonId: string, completed: boolean) => void;
    currentLessonId?: string;
}

const SectionSidebar: React.FC<SectionSidebarProps> = ({
    sections,
    onLessonSelect,
    onLessonToggleComplete,
    currentLessonId
}) => {
    const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

    // Tự động mở panel chứa lesson hiện tại
    useEffect(() => {
        if (currentLessonId && sections.length > 0) {
            const sectionWithCurrentLesson = sections.find(section =>
                section.lessons.some(lesson => lesson.id === currentLessonId)
            );

            if (sectionWithCurrentLesson) {
                setActiveKeys(prevKeys => {
                    const newKeys = [...prevKeys];
                    if (!newKeys.includes(sectionWithCurrentLesson.id)) {
                        newKeys.push(sectionWithCurrentLesson.id);
                    }
                    return newKeys;
                });
            }
        }
    }, [currentLessonId, sections]);

    const getLessonIcon = (lesson: Lesson) => {
        if (lesson.completed) {
            return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
        }
        return lesson.type === 'video'
            ? <PlayCircleOutlined style={{ color: '#1890ff' }} />
            : <FileTextOutlined style={{ color: '#faad14' }} />;
    };

    const getLessonStatus = (lesson: Lesson) => {
        if (lesson.completed) return 'completed';
        if (lesson.id === currentLessonId) return 'current';
        return 'pending';
    };

    const renderLessonItem = (lesson: Lesson) => {
        const isCurrentLesson = lesson.id === currentLessonId;

        const handleCheckboxChange = (e: CheckboxChangeEvent) => {
            e.nativeEvent?.stopPropagation(); // Prevent triggering lesson selection
            if (onLessonToggleComplete) {
                onLessonToggleComplete(lesson.id, !lesson.completed);
            }
        };

        const handleLessonClick = (e: React.MouseEvent) => {
            // Prevent event bubbling để không trigger collapse
            e.stopPropagation();
            onLessonSelect(lesson);
        };

        return (
            <List.Item
                className={`lesson-item lesson-${getLessonStatus(lesson)}`}
                onClick={handleLessonClick}
                style={{ cursor: 'pointer' }}
            >
                <div className="lesson-content">
                    <div className="lesson-header">
                        <Space>
                            <Checkbox
                                checked={lesson.completed}
                                onChange={handleCheckboxChange}
                                onClick={(e) => e.stopPropagation()}
                            />
                            {getLessonIcon(lesson)}
                            <Text
                                strong={isCurrentLesson}
                                className={isCurrentLesson ? 'current-lesson-title' : ''}
                            >
                                {lesson.title}
                            </Text>
                        </Space>
                        {lesson.completed && (
                            <Badge
                                status="success"
                                text={<Text type="secondary" className="completed-badge">Hoàn thành</Text>}
                            />
                        )}
                    </div>

                    <div className="lesson-meta">
                        <Space size="small">
                            <ClockCircleOutlined />
                            <Text type="secondary" className="lesson-duration">
                                {lesson.duration}
                            </Text>
                            {lesson.type === 'exercise' && (
                                <Text type="secondary" className="lesson-type">
                                    • Bài tập
                                </Text>
                            )}
                        </Space>
                    </div>
                </div>
            </List.Item>
        );
    };

    const renderSectionHeader = (section: Section) => {
        const progress = (section.completedLessons / section.totalLessons) * 100;

        return (
            <div className="section-header">
                <Title level={5} className="section-title">
                    {section.title}
                </Title>
                <div className="section-progress">
                    <Progress
                        percent={Math.round(progress)}
                        size="small"
                        strokeColor="#52c41a"
                        showInfo={false}
                    />
                    <Text type="secondary" className="progress-text">
                        {section.completedLessons}/{section.totalLessons} bài học
                    </Text>
                </div>
            </div>
        );
    };

    const handleCollapseChange = (keys: string | string[]) => {
        const newKeys = Array.isArray(keys) ? keys : [keys];

        // Nếu có lesson hiện tại, luôn giữ panel chứa lesson đó mở
        if (currentLessonId && sections.length > 0) {
            const sectionWithCurrentLesson = sections.find(section =>
                section.lessons.some(lesson => lesson.id === currentLessonId)
            );

            if (sectionWithCurrentLesson && !newKeys.includes(sectionWithCurrentLesson.id)) {
                newKeys.push(sectionWithCurrentLesson.id);
            }
        }

        setActiveKeys(newKeys);
    };

    const handleExpandAll = () => {
        const allKeys = sections.map(section => section.id);
        setActiveKeys(allKeys);
    };

    return (
        <div className="section-sidebar">
            <div className="sidebar-header">
                <Title level={4}>Nội dung khóa học</Title>
                <Button type="text" size="small" onClick={handleExpandAll}>
                    Mở rộng tất cả
                </Button>
            </div>

            <Collapse
                activeKey={activeKeys}
                onChange={handleCollapseChange}
                className="sections-collapse"
                ghost
            >
                {sections.map((section) => (
                    <Panel
                        key={section.id}
                        header={renderSectionHeader(section)}
                        className="section-panel"
                    >
                        <List
                            className="lessons-list"
                            dataSource={section.lessons}
                            renderItem={renderLessonItem}
                            split={false}
                        />
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default SectionSidebar;
