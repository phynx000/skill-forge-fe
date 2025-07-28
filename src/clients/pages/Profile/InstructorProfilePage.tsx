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
    List,
    Tag,
    Rate,
    Space,
    Table,
    Tooltip,
    Badge
} from 'antd';
import {
    UserOutlined,
    EditOutlined,
    BookOutlined,
    EyeOutlined,
    StarOutlined,
    DollarOutlined,
    UsergroupAddOutlined,
    TrophyOutlined,
    PlusOutlined,
    MessageOutlined,
    SettingOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './UserProfile.scss';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface InstructorCourse {
    id: string;
    title: string;
    thumbnail: string;
    students: number;
    rating: number;
    reviews: number;
    revenue: number;
    status: 'published' | 'draft' | 'pending';
    publishDate: string;
    category: string;
    level: string;
}

interface Review {
    id: string;
    studentName: string;
    studentAvatar: string;
    courseName: string;
    rating: number;
    comment: string;
    date: string;
}

interface Earning {
    month: string;
    revenue: number;
    students: number;
    courses: number;
}

// Mock data cho instructor
const mockInstructorData = {
    id: '1',
    name: 'Trần Minh Khôi',
    email: 'tranminhkhoi@email.com',
    avatar: '/api/placeholder/120/120',
    role: 'instructor',
    joinDate: '2022-06-15',
    bio: 'Senior Full-stack Developer với 8+ năm kinh nghiệm. Chuyên gia về React, Node.js và cloud computing.',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    website: 'https://tranminhkhoi.dev',
    specializations: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    experience: '8+ năm',
    education: 'Thạc sĩ Khoa học Máy tính - ĐH Bách Khoa',
    stats: {
        totalStudents: 12450,
        totalCourses: 15,
        averageRating: 4.8,
        totalRevenue: 245000000,
        totalReviews: 2341,
        coursesCompleted: 13
    }
};

const mockInstructorCourses: InstructorCourse[] = [
    {
        id: '1',
        title: 'React.js từ Zero đến Hero',
        thumbnail: '/api/placeholder/300/180',
        students: 3450,
        rating: 4.9,
        reviews: 890,
        revenue: 89000000,
        status: 'published',
        publishDate: '2023-03-15',
        category: 'Frontend',
        level: 'Beginner'
    },
    {
        id: '2',
        title: 'Node.js Backend Master Class',
        thumbnail: '/api/placeholder/300/180',
        students: 2180,
        rating: 4.7,
        reviews: 567,
        revenue: 65000000,
        status: 'published',
        publishDate: '2023-05-20',
        category: 'Backend',
        level: 'Intermediate'
    },
    {
        id: '3',
        title: 'TypeScript Advanced Techniques',
        thumbnail: '/api/placeholder/300/180',
        students: 1890,
        rating: 4.8,
        reviews: 423,
        revenue: 58000000,
        status: 'published',
        publishDate: '2023-08-10',
        category: 'Programming',
        level: 'Advanced'
    },
    {
        id: '4',
        title: 'Microservices với Docker',
        thumbnail: '/api/placeholder/300/180',
        students: 0,
        rating: 0,
        reviews: 0,
        revenue: 0,
        status: 'draft',
        publishDate: '',
        category: 'DevOps',
        level: 'Advanced'
    }
];

const mockReviews: Review[] = [
    {
        id: '1',
        studentName: 'Nguyễn Văn An',
        studentAvatar: '/api/placeholder/40/40',
        courseName: 'React.js từ Zero đến Hero',
        rating: 5,
        comment: 'Khóa học rất tuyệt vời! Giảng viên giải thích rất dễ hiểu và có nhiều ví dụ thực tế.',
        date: '2024-01-20'
    },
    {
        id: '2',
        studentName: 'Lê Thị Mai',
        studentAvatar: '/api/placeholder/40/40',
        courseName: 'Node.js Backend Master Class',
        rating: 5,
        comment: 'Nội dung chi tiết, project thực hành hay. Rất đáng tiền!',
        date: '2024-01-18'
    },
    {
        id: '3',
        studentName: 'Phạm Đức Minh',
        studentAvatar: '/api/placeholder/40/40',
        courseName: 'TypeScript Advanced Techniques',
        rating: 4,
        comment: 'Khóa học hay nhưng hơi khó với người mới bắt đầu.',
        date: '2024-01-15'
    }
];

const mockEarnings: Earning[] = [
    { month: 'Jan 2024', revenue: 25000000, students: 450, courses: 3 },
    { month: 'Dec 2023', revenue: 32000000, students: 620, courses: 3 },
    { month: 'Nov 2023', revenue: 28000000, students: 580, courses: 3 },
    { month: 'Oct 2023', revenue: 30000000, students: 610, courses: 3 },
    { month: 'Sep 2023', revenue: 35000000, students: 720, courses: 3 }
];

const InstructorProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const renderOverviewTab = () => (
        <div className="instructor-overview">
            <Row gutter={[24, 24]}>
                {/* Stats Cards */}
                <Col span={24}>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} sm={6} md={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Tổng học viên"
                                    value={mockInstructorData.stats.totalStudents}
                                    prefix={<UsergroupAddOutlined />}
                                    valueStyle={{ color: '#c800de' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Khóa học"
                                    value={mockInstructorData.stats.totalCourses}
                                    prefix={<BookOutlined />}
                                    valueStyle={{ color: '#52c41a' }}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Đánh giá TB"
                                    value={mockInstructorData.stats.averageRating}
                                    prefix={<StarOutlined />}
                                    valueStyle={{ color: '#faad14' }}
                                    precision={1}
                                />
                            </Card>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <Card className="stat-card">
                                <Statistic
                                    title="Doanh thu"
                                    value={mockInstructorData.stats.totalRevenue}
                                    prefix={<DollarOutlined />}
                                    valueStyle={{ color: '#1890ff' }}
                                    formatter={(value) => formatCurrency(Number(value))}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Col>

                {/* Quick Actions */}
                <Col span={24}>
                    <Card title="Thao tác nhanh" className="quick-actions-card">
                        <Space wrap>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                size="large"
                                onClick={() => navigate('/create-course')}
                            >
                                Tạo khóa học mới
                            </Button>
                            <Button icon={<BarChartOutlined />} size="large">
                                Xem báo cáo
                            </Button>
                            <Button icon={<MessageOutlined />} size="large">
                                Tin nhắn học viên
                            </Button>
                            <Button icon={<SettingOutlined />} size="large">
                                Cài đặt instructor
                            </Button>
                        </Space>
                    </Card>
                </Col>

                {/* Recent Reviews & Earnings */}
                <Col xs={24} lg={12}>
                    <Card title="Đánh giá gần đây" className="reviews-card">
                        <List
                            itemLayout="horizontal"
                            dataSource={mockReviews.slice(0, 3)}
                            renderItem={review => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={review.studentAvatar} />}
                                        title={
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text strong>{review.studentName}</Text>
                                                <Rate disabled defaultValue={review.rating} style={{ fontSize: 12 }} />
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    {review.courseName}
                                                </Text>
                                                <Paragraph
                                                    ellipsis={{ rows: 2 }}
                                                    style={{ margin: '4px 0 0 0', fontSize: 13 }}
                                                >
                                                    {review.comment}
                                                </Paragraph>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Doanh thu theo tháng" className="earnings-card">
                        <List
                            itemLayout="horizontal"
                            dataSource={mockEarnings.slice(0, 5)}
                            renderItem={earning => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={earning.month}
                                        description={
                                            <Space direction="vertical" style={{ width: '100%' }}>
                                                <Text strong style={{ color: '#c800de' }}>
                                                    {formatCurrency(earning.revenue)}
                                                </Text>
                                                <Text type="secondary" style={{ fontSize: 12 }}>
                                                    {earning.students} học viên mới
                                                </Text>
                                            </Space>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );

    const renderCoursesTab = () => (
        <div className="instructor-courses">
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0 }}>Khóa học của tôi</Title>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/create-course')}
                >
                    Tạo khóa học mới
                </Button>
            </div>

            <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3 }}
                dataSource={mockInstructorCourses}
                renderItem={course => (
                    <List.Item>
                        <Card
                            hoverable
                            cover={<img alt={course.title} src={course.thumbnail} />}
                            actions={[
                                <Tooltip title="Xem chi tiết">
                                    <Button type="text" icon={<EyeOutlined />} />
                                </Tooltip>,
                                <Tooltip title="Chỉnh sửa">
                                    <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        onClick={() => navigate(`/edit-course/${course.id}`)}
                                    />
                                </Tooltip>,
                                <Tooltip title="Quản lý">
                                    <Button type="text" icon={<SettingOutlined />} />
                                </Tooltip>
                            ]}
                            className="instructor-course-card"
                        >
                            <Badge.Ribbon
                                text={course.status === 'published' ? 'Đã xuất bản' : course.status === 'draft' ? 'Bản nháp' : 'Chờ duyệt'}
                                color={course.status === 'published' ? 'green' : course.status === 'draft' ? 'orange' : 'blue'}
                            >
                                <Card.Meta
                                    title={course.title}
                                    description={
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Tag color="blue">{course.category}</Tag>
                                                <Tag color="purple">{course.level}</Tag>
                                            </div>

                                            {course.status === 'published' && (
                                                <>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Text type="secondary">
                                                            <UsergroupAddOutlined /> {course.students} học viên
                                                        </Text>
                                                        <div>
                                                            <Rate disabled defaultValue={course.rating} style={{ fontSize: 12 }} />
                                                            <Text type="secondary" style={{ marginLeft: 4, fontSize: 12 }}>
                                                                ({course.reviews})
                                                            </Text>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Text strong style={{ color: '#c800de' }}>
                                                            {formatCurrency(course.revenue)}
                                                        </Text>
                                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                                            {course.publishDate}
                                                        </Text>
                                                    </div>
                                                </>
                                            )}

                                            {course.status === 'draft' && (
                                                <Text type="secondary">Khóa học đang trong quá trình phát triển</Text>
                                            )}
                                        </Space>
                                    }
                                />
                            </Badge.Ribbon>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );

    const reviewColumns = [
        {
            title: 'Học viên',
            dataIndex: 'studentName',
            key: 'studentName',
            render: (text: string, record: Review) => (
                <Space>
                    <Avatar src={record.studentAvatar} size="small" />
                    <Text>{text}</Text>
                </Space>
            )
        },
        {
            title: 'Khóa học',
            dataIndex: 'courseName',
            key: 'courseName'
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: number) => <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />
        },
        {
            title: 'Nhận xét',
            dataIndex: 'comment',
            key: 'comment',
            render: (text: string) => (
                <Paragraph ellipsis={{ rows: 2, expandable: true }} style={{ margin: 0, maxWidth: 300 }}>
                    {text}
                </Paragraph>
            )
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN')
        }
    ];

    const renderReviewsTab = () => (
        <div className="instructor-reviews">
            <Card title={`Tất cả đánh giá (${mockInstructorData.stats.totalReviews})`}>
                <Table
                    columns={reviewColumns}
                    dataSource={mockReviews}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true
                    }}
                />
            </Card>
        </div>
    );

    return (
        <div className="user-profile-page instructor-profile">
            <div className="profile-container">
                {/* Profile Header */}
                <Card className="profile-header">
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} sm={6} md={4}>
                            <div className="profile-avatar">
                                <Avatar size={120} src={mockInstructorData.avatar} icon={<UserOutlined />} />
                                <Badge.Ribbon text="Instructor" color="purple" />
                            </div>
                        </Col>
                        <Col xs={24} sm={18} md={20}>
                            <div className="profile-info">
                                <div className="profile-name-section">
                                    <Title level={2} style={{ margin: 0 }}>
                                        {mockInstructorData.name}
                                    </Title>
                                    <Tag color="purple" style={{ marginLeft: 8 }}>
                                        <TrophyOutlined /> Expert Instructor
                                    </Tag>
                                </div>

                                <Paragraph style={{ margin: '8px 0', color: '#666' }}>
                                    {mockInstructorData.bio}
                                </Paragraph>

                                <Space wrap style={{ marginBottom: 8 }}>
                                    <Text strong>Chuyên môn:</Text>
                                    {mockInstructorData.specializations.map(skill => (
                                        <Tag key={skill} color="blue">{skill}</Tag>
                                    ))}
                                </Space>

                                <Space wrap style={{ marginBottom: 16 }}>
                                    <Text type="secondary">📍 {mockInstructorData.location}</Text>
                                    <Text type="secondary">🎓 {mockInstructorData.education}</Text>
                                    <Text type="secondary">💼 {mockInstructorData.experience}</Text>
                                </Space>

                                <div>
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined />}
                                        onClick={() => navigate('/instructor/profile/edit')}
                                    >
                                        Chỉnh sửa hồ sơ
                                    </Button>
                                    <Button style={{ marginLeft: 8 }} icon={<BarChartOutlined />}>
                                        Analytics
                                    </Button>
                                    <Button style={{ marginLeft: 8 }} icon={<SettingOutlined />}>
                                        Cài đặt
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
                        <TabPane tab="Đánh giá" key="reviews">
                            {renderReviewsTab()}
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
};

export default InstructorProfilePage;
