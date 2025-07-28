import React, { useState } from 'react';
import {
    Collapse,
    List,
    Typography,
    Progress,
    Badge,
    Space,
    Button
} from 'antd';
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
    currentLessonId?: string;
}

const SectionSidebar: React.FC<SectionSidebarProps> = ({
    sections,
    onLessonSelect,
    currentLessonId
}) => {
    const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

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

        return (
            <List.Item
                className={`lesson-item lesson-${getLessonStatus(lesson)}`}
                onClick={() => onLessonSelect(lesson)}
            >
                <div className="lesson-content">
                    <div className="lesson-header">
                        <Space>
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
        setActiveKeys(Array.isArray(keys) ? keys : [keys]);
    };

    return (
        <div className="section-sidebar">
            <div className="sidebar-header">
                <Title level={4}>Nội dung khóa học</Title>
                <Button type="text" size="small">
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
