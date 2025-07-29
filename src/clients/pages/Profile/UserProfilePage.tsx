import React, { useState } from 'react';
import {
    Card,
    Avatar,
    Button,
    Typography,
    Row,
    Col,
    Tabs,
    Statistic,
    Progress,
    List,
    Tag,
    Badge,
    Rate,
    Space,
    Divider,
    Timeline,
    Empty
} from 'antd';
import {
    UserOutlined,
    EditOutlined,
    BookOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    SafetyCertificateOutlined,
    PlayCircleOutlined,
    CheckCircleOutlined,
    CalendarOutlined,
    MessageOutlined,
    HeartOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './UserProfile.scss';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface Course {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    rating: number;
    thumbnail: string;
    status: 'in-progress' | 'completed' | 'not-started';
    lastAccessed: string;
}

interface Certificate {
    id: string;
    courseName: string;
    issueDate: string;
    instructor: string;
    certificateUrl: string;
}

interface Activity {
    id: string;
    type: 'course_completed' | 'lesson_completed' | 'certificate_earned' | 'course_enrolled';
    title: string;
    description: string;
    timestamp: string;
    icon: React.ReactNode;
}

// Mock data - trong thực tế sẽ fetch từ API
const mockUserData = {
    id: '1',
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    avatar: '/api/placeholder/120/120',
    role: 'student', // hoặc 'instructor'
    joinDate: '2023-01-15',
    bio: 'Học viên tích cực tại SkillForge, đam mê học hỏi và phát triển kỹ năng lập trình.',
    location: 'Hà Nội, Việt Nam',
    website: 'https://nguyenvanan.dev',
    socialLinks: {
        linkedin: 'https://linkedin.com/in/nguyenvanan',
        github: 'https://github.com/nguyenvanan'
    },
    stats: {
        coursesEnrolled: 12,
        coursesCompleted: 8,
        certificatesEarned: 6,
        totalLearningHours: 156,
        skillsLearned: 15,
        averageRating: 4.8
    }
};

const mockCourses: Course[] = [
    {
        id: '1',
        title: 'React.js Fundamentals',
        instructor: 'Trần Minh Khôi',
        progress: 85,
        totalLessons: 24,
        completedLessons: 20,
        rating: 5,
        thumbnail: '/api/placeholder/200/120',
        status: 'in-progress',
        lastAccessed: '2024-01-20'
    },
    {
        id: '2',
        title: 'TypeScript Advanced',
        instructor: 'Lê Thị Hương',
        progress: 100,
        totalLessons: 18,
        completedLessons: 18,
        rating: 5,
        thumbnail: '/api/placeholder/200/120',
        status: 'completed',
        lastAccessed: '2024-01-15'
    },
    {
        id: '3',
        title: 'Node.js Backend Development',
        instructor: 'Phạm Đức Minh',
        progress: 45,
        totalLessons: 32,
        completedLessons: 14,
        rating: 4,
        thumbnail: '/api/placeholder/200/120',
        status: 'in-progress',
        lastAccessed: '2024-01-18'
    }
];

const mockCertificates: Certificate[] = [
    {
        id: '1',
        courseName: 'React.js Fundamentals',
        issueDate: '2024-01-15',
        instructor: 'Trần Minh Khôi',
        certificateUrl: '/certificates/react-fundamentals.pdf'
    },
    {
        id: '2',
        courseName: 'JavaScript ES6+',
        issueDate: '2023-12-20',
        instructor: 'Nguyễn Thành Long',
        certificateUrl: '/certificates/javascript-es6.pdf'
    }
];

const mockActivities: Activity[] = [
    {
        id: '1',
        type: 'course_completed',
        title: 'Hoàn thành khóa học',
        description: 'TypeScript Advanced',
        timestamp: '2024-01-15',
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    },
    {
        id: '2',
        type: 'certificate_earned',
        title: 'Nhận chứng chỉ',
        description: 'React.js Fundamentals Certificate',
        timestamp: '2024-01-14',
        icon: <SafetyCertificateOutlined style={{ color: '#c800de' }} />
    },
    {
        id: '3',
        type: 'lesson_completed',
        title: 'Hoàn thành bài học',
        description: 'Advanced React Hooks trong React.js Fundamentals',
        timestamp: '2024-01-13',
        icon: <PlayCircleOutlined style={{ color: '#1890ff' }} />
    }
];

const UserProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const renderOverviewTab = () => (
        <div className="profile-overview">
            <Row gutter={[24, 24]}>
                {/* Stats Cards */}
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={8} md={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Khóa học đã tham gia"
                                    value={mockUserData.stats.coursesEnrolled}
                                    prefix={<BookOutlined />}
                                    valueStyle={{ color: '#c800de' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={8} md={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Khóa học hoàn thành"
                                    value={mockUserData.stats.coursesCompleted}
                                    prefix={<CheckCircleOutlined />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={8} md={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Chứng chỉ đạt được"
                                    value={mockUserData.stats.certificatesEarned}
                                    prefix={<TrophyOutlined />}
                                    valueStyle={{ color: '#faad14' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={8} md={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Giờ học tích lũy"
                                    value={mockUserData.stats.totalLearningHours}
                                    prefix={<ClockCircleOutlined />}
                                    valueStyle={{ color: '#1890ff' }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>

                {/* Recent Activities */}
                <Col xs={24} lg={12}>
                    <Card title="Hoạt động gần đây" className="activity-card">
                        <Timeline>
                            {mockActivities.map(activity => (
                                <Timeline.Item key={activity.id} dot={activity.icon}>
                                    <div className="activity-item">
                                        <Text strong>{activity.title}</Text>
                                        <br />
                                        <Text type="secondary">{activity.description}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {new Date(activity.timestamp).toLocaleDateString('vi-VN')}
                                        </Text>
                                    </div>
                                </Timeline.Item>
                            ))}
                        </Timeline>
                    </Card>
                </Col>

                {/* Learning Progress */}
                <Col xs={24} lg={12}>
                    <Card title="Tiến độ học tập" className="progress-card">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div>
                                <Text>Tỷ lệ hoàn thành khóa học</Text>
                                <Progress
                                    percent={Math.round((mockUserData.stats.coursesCompleted / mockUserData.stats.coursesEnrolled) * 100)}
                                    strokeColor="#c800de"
                                />
                            </div>
                            <div>
                                <Text>Điểm đánh giá trung bình</Text>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Rate disabled defaultValue={mockUserData.stats.averageRating} />
                                    <Text strong>{mockUserData.stats.averageRating}/5</Text>
                                </div>
                            </div>
                            <div>
                                <Text>Kỹ năng đã học</Text>
                                <div style={{ marginTop: 8 }}>
                                    <Tag color="blue">React</Tag>
                                    <Tag color="green">TypeScript</Tag>
                                    <Tag color="orange">Node.js</Tag>
                                    <Tag color="purple">JavaScript</Tag>
                                    <Tag color="cyan">CSS</Tag>
                                </div>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderCoursesTab = () => (
        <div className="profile-courses">
            <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
                dataSource={mockCourses}
                renderItem={course => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={<img alt={course.title} src={course.thumbnail} />}
                            actions={[
                                <Button type="primary" icon={<PlayCircleOutlined />}>
                                    Tiếp tục học
                                </Button>
                            ]}
                            className="course-card"
                        >
                            <Card.Meta
                                title={course.title}
                                description={
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Text type="secondary">Giảng viên: {course.instructor}</Text>
                                        <div>
                                            <Text>Tiến độ: {course.completedLessons}/{course.totalLessons} bài học</Text>
                                            <Progress percent={course.progress} size="small" />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Rate disabled defaultValue={course.rating} style={{ fontSize: 12 }} />
                                            <Badge
                                                status={course.status === 'completed' ? 'success' : 'processing'}
                                                text={course.status === 'completed' ? 'Hoàn thành' : 'Đang học'}
                                            />
                                        </div>
                                    </Space>
                                }
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );

    const renderCertificatesTab = () => (
        <div className="profile-certificates">
            {mockCertificates.length > 0 ? (
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                    dataSource={mockCertificates}
                    renderItem={certificate => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={
                                    <div className="certificate-preview">
                                        <SafetyCertificateOutlined style={{ fontSize: 48, color: '#c800de' }} />
                                    </div>
                                }
                                actions={[
                                    <Button icon={<ShareAltOutlined />}>Chia sẻ</Button>,
                                    <Button type="primary">Tải xuống</Button>
                                ]}
                                className="certificate-card"
                            >
                                <Card.Meta
                                    title={certificate.courseName}
                                    description={
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Text type="secondary">Giảng viên: {certificate.instructor}</Text>
                                            <Text type="secondary">
                                                <CalendarOutlined /> {new Date(certificate.issueDate).toLocaleDateString('vi-VN')}
                                            </Text>
                                        </Space>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <Empty
                    description="Chưa có chứng chỉ nào"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            )}
        </div>
    );

    return (
        <div className="user-profile-page">
            <div className="profile-container">
                {/* Profile Header */}
                <Card className="profile-header">
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} sm={6} md={4}>
                            <div className="profile-avatar">
                                <Avatar size={120} src={mockUserData.avatar} icon={<UserOutlined />} />
                            </div>
                        </Col>
                        <Col xs={24} sm={18} md={20}>
                            <div className="profile-info">
                                <div className="profile-name-section">
                                    <Title level={2} style={{ margin: 0 }}>
                                        {mockUserData.name}
                                    </Title>
                                    <Tag color="blue" style={{ marginLeft: 8 }}>
                                        {mockUserData.role === 'student' ? 'Học viên' : 'Giảng viên'}
                                    </Tag>
                                </div>

                                <Paragraph style={{ margin: '8px 0', color: '#666' }}>
                                    {mockUserData.bio}
                                </Paragraph>

                                <Space wrap>
                                    <Text type="secondary">
                                        <CalendarOutlined /> Tham gia từ {new Date(mockUserData.joinDate).toLocaleDateString('vi-VN')}
                                    </Text>
                                    <Text type="secondary">{mockUserData.location}</Text>
                                    {mockUserData.website && (
                                        <a href={mockUserData.website} target="_blank" rel="noopener noreferrer">
                                            {mockUserData.website}
                                        </a>
                                    )}
                                </Space>

                                <div style={{ marginTop: 16 }}>
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined />}
                                        onClick={() => navigate('/profile/edit')}
                                    >
                                        Chỉnh sửa hồ sơ
                                    </Button>
                                    <Button style={{ marginLeft: 8 }} icon={<MessageOutlined />}>
                                        Tin nhắn
                                    </Button>
                                    <Button style={{ marginLeft: 8 }} icon={<HeartOutlined />}>
                                        Theo dõi
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Profile Content */}
                <Card style={{ marginTop: 24 }}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab}>
                        <TabPane tab="Tổng quan" key="overview">
                            {renderOverviewTab()}
                        </TabPane>
                        <TabPane tab="Khóa học" key="courses">
                            {renderCoursesTab()}
                        </TabPane>
                        <TabPane tab="Chứng chỉ" key="certificates">
                            {renderCertificatesTab()}
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
};

export default UserProfilePage;
