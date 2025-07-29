import React from 'react';
import {
    Typography,
    Button,
    Rate,
    Avatar,
    Collapse,
    Card,
    Row,
    Col,
    Divider,
    List,
    Space,
    Tag,
    Image
} from 'antd';
import {
    CheckOutlined,
    CheckCircleOutlined,
    PlayCircleOutlined,
    ClockCircleOutlined,
    UserOutlined,
    BookOutlined,
    GlobalOutlined,
    TrophyOutlined,
    SafetyOutlined,
    ApiOutlined,
    ShoppingCartOutlined,
    HeartOutlined
} from '@ant-design/icons';
import './CourseDetail.scss';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// Mock data cho khóa học
const courseData = {
    id: 1,
    title: "React Complete Course - Từ Cơ Bản Đến Nâng Cao 2024",
    shortDescription: "Học React.js từ A-Z với TypeScript, Hooks, Context API, Redux Toolkit và các dự án thực tế",
    instructor: {
        name: "Nguyễn Văn An",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        title: "Senior Frontend Developer",
        experience: "5+ năm kinh nghiệm"
    },
    rating: 4.8,
    reviewCount: 1250,
    studentCount: 8500,
    lastUpdated: "Tháng 12, 2024",
    price: 1299000,
    originalPrice: 2499000,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    duration: "35 giờ",
    lessonCount: 180,
    level: "Từ cơ bản đến nâng cao",
    language: "Tiếng Việt",
    features: [
        "35 giờ video theo yêu cầu",
        "180 bài học",
        "Truy cập trên điện thoại và TV",
        "Chứng nhận hoàn thành",
        "Truy cập trọn đời",
        "30 ngày hoàn tiền"
    ],
    whatYouLearn: [
        "Xây dựng ứng dụng React từ đầu đến cuối",
        "Hiểu sâu về React Hooks và Context API",
        "Làm việc với TypeScript trong React",
        "Quản lý state với Redux Toolkit",
        "Responsive design với Ant Design",
        "Deploy ứng dụng lên production",
        "Best practices và design patterns",
        "Testing với Jest và React Testing Library"
    ],
    curriculum: [
        {
            title: "Giới thiệu và Cài đặt",
            lessons: [
                { title: "Giới thiệu về React", duration: "15:30", isPreview: true },
                { title: "Cài đặt môi trường", duration: "12:45", isPreview: false },
                { title: "Tạo project đầu tiên", duration: "20:15", isPreview: false }
            ]
        },
        {
            title: "React Fundamentals",
            lessons: [
                { title: "Components và JSX", duration: "25:30", isPreview: true },
                { title: "Props và State", duration: "30:45", isPreview: false },
                { title: "Event Handling", duration: "18:20", isPreview: false },
                { title: "Conditional Rendering", duration: "22:10", isPreview: false }
            ]
        },
        {
            title: "React Hooks",
            lessons: [
                { title: "useState Hook", duration: "28:15", isPreview: false },
                { title: "useEffect Hook", duration: "35:40", isPreview: false },
                { title: "useContext Hook", duration: "25:30", isPreview: false },
                { title: "Custom Hooks", duration: "32:20", isPreview: false }
            ]
        },
        {
            title: "TypeScript với React",
            lessons: [
                { title: "TypeScript Basics", duration: "40:15", isPreview: false },
                { title: "Typing Components", duration: "28:30", isPreview: false },
                { title: "Props Types", duration: "22:45", isPreview: false }
            ]
        },
        {
            title: "State Management",
            lessons: [
                { title: "Context API Advanced", duration: "35:20", isPreview: false },
                { title: "Redux Toolkit Setup", duration: "30:15", isPreview: false },
                { title: "Creating Slices", duration: "25:40", isPreview: false },
                { title: "Async Actions", duration: "32:30", isPreview: false }
            ]
        }
    ],
    description: `
    <h3>Mô tả khóa học</h3>
    <p>Khóa học React Complete này được thiết kế dành cho những ai muốn học React.js từ cơ bản đến nâng cao. 
    Bạn sẽ học cách xây dựng các ứng dụng web hiện đại với React, TypeScript và các công cụ mới nhất.</p>
    
    <h4>Tại sao chọn khóa học này?</h4>
    <ul>
      <li>Nội dung được cập nhật liên tục theo xu hướng mới nhất</li>
      <li>Dự án thực tế để áp dụng kiến thức</li>
      <li>Hỗ trợ trực tiếp từ giảng viên</li>
      <li>Cộng đồng học viên tích cực</li>
    </ul>
    
    <h4>Sau khóa học bạn có thể:</h4>
    <ul>
      <li>Xây dựng ứng dụng React chuyên nghiệp</li>
      <li>Làm việc với team development</li>
      <li>Ứng tuyển vị trí Frontend Developer</li>
      <li>Phát triển side projects cá nhân</li>
    </ul>
  `
};

const CourseDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const calculateDiscount = () => {
        return Math.round(((courseData.originalPrice - courseData.price) / courseData.originalPrice) * 100);
    };

    const handleStartLearning = () => {
        navigate(`/course/${id}/learn`);
    };

    return (
        <div className="course-detail-page">
            <div className="container">
                <Row gutter={[24, 24]}>
                    {/* Phần bên trái - Nội dung chính */}
                    <Col xs={24} lg={16}>
                        <div className="course-content">
                            {/* Header */}
                            <div className="course-header">
                                <Title level={1} className="course-title">
                                    {courseData.title}
                                </Title>

                                <Paragraph className="course-description">
                                    {courseData.shortDescription}
                                </Paragraph>

                                {/* Thông tin giảng viên */}
                                <div className="instructor-info">
                                    <Space size="middle">
                                        <Avatar size={48} src={courseData.instructor.avatar} />
                                        <div>
                                            <Text strong>{courseData.instructor.name}</Text>
                                            <br />
                                            <Text type="secondary">{courseData.instructor.title}</Text>
                                        </div>
                                    </Space>
                                    <Text type="secondary" className="last-updated">
                                        Cập nhật: {courseData.lastUpdated}
                                    </Text>
                                </div>

                                {/* Thông tin đánh giá */}
                                <div className="rating-info">
                                    <Space size="middle" wrap>
                                        <Space>
                                            <Rate disabled defaultValue={courseData.rating} allowHalf />
                                            <Text strong>{courseData.rating}</Text>
                                        </Space>
                                        <Text>({courseData.reviewCount.toLocaleString()} đánh giá)</Text>
                                        <Text>{courseData.studentCount.toLocaleString()} học viên</Text>
                                    </Space>
                                </div>
                            </div>

                            <Divider />

                            {/* Bạn sẽ học được gì */}
                            <div className="what-you-learn">
                                <Title level={3}>Bạn sẽ học được gì</Title>
                                <Row gutter={[16, 8]}>
                                    {courseData.whatYouLearn.map((item, index) => (
                                        <Col xs={24} md={12} key={index}>
                                            <Space align="start">
                                                <CheckOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                                                <Text>{item}</Text>
                                            </Space>
                                        </Col>
                                    ))}
                                </Row>
                            </div>

                            <Divider />

                            {/* Nội dung khóa học */}
                            <div className="course-curriculum">
                                <Title level={3}>Nội dung khóa học</Title>
                                <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                                    {courseData.curriculum.length} chương • {courseData.lessonCount} bài học •
                                    {courseData.duration} tổng thời lượng
                                </Text>

                                <Collapse>
                                    {courseData.curriculum.map((chapter, index) => (
                                        <Panel
                                            header={
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text strong>{chapter.title}</Text>
                                                    <Text type="secondary">{chapter.lessons.length} bài học</Text>
                                                </div>
                                            }
                                            key={index}
                                        >
                                            <List
                                                dataSource={chapter.lessons}
                                                renderItem={(lesson) => (
                                                    <List.Item>
                                                        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                                            <Space>
                                                                <PlayCircleOutlined />
                                                                <Text>{lesson.title}</Text>
                                                                {lesson.isPreview && <Tag color="blue">Xem trước</Tag>}
                                                            </Space>
                                                            <Text type="secondary">{lesson.duration}</Text>
                                                        </Space>
                                                    </List.Item>
                                                )}
                                            />
                                        </Panel>
                                    ))}
                                </Collapse>
                            </div>

                            <Divider />

                            {/* Mô tả chi tiết */}
                            <div className="course-description-detail">
                                <Title level={3}>Mô tả</Title>
                                <div
                                    className="description-content"
                                    dangerouslySetInnerHTML={{ __html: courseData.description }}
                                />
                            </div>
                        </div>
                    </Col>

                    {/* Phần bên phải - Sidebar */}
                    <Col xs={24} lg={8}>
                        <div className="course-sidebar">
                            <Card className="purchase-card">
                                {/* Thumbnail */}
                                <div className="course-thumbnail">
                                    <Image
                                        src={courseData.thumbnail}
                                        alt={courseData.title}
                                        preview={false}
                                        style={{ borderRadius: 8 }}
                                    />
                                    <div className="play-overlay">
                                        <PlayCircleOutlined style={{ fontSize: 48, color: 'white' }} />
                                    </div>
                                </div>

                                {/* Giá */}
                                <div className="price-section">
                                    <Space align="baseline">
                                        <Text className="current-price">{formatPrice(courseData.price)}</Text>
                                        <Text delete type="secondary" className="original-price">
                                            {formatPrice(courseData.originalPrice)}
                                        </Text>
                                        <Tag color="red" className="discount-tag">
                                            -{calculateDiscount()}%
                                        </Tag>
                                    </Space>
                                </div>

                                {/* Buttons */}
                                <div className="action-buttons">
                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        className="buy-button"
                                        icon={<PlayCircleOutlined />}
                                        onClick={handleStartLearning}
                                    >
                                        Bắt đầu học
                                    </Button>
                                    <Button
                                        size="large"
                                        block
                                        className="cart-button"
                                        icon={<ShoppingCartOutlined />}
                                    >
                                        Mua ngay
                                    </Button>
                                    <Button
                                        size="large"
                                        block
                                        className="cart-button"
                                        icon={<HeartOutlined />}
                                    >
                                        Thêm vào yêu thích
                                    </Button>
                                </div>

                                <Divider />

                                {/* Thông tin khóa học */}
                                <div className="course-info">
                                    <Title level={5}>Khóa học bao gồm:</Title>
                                    <List
                                        dataSource={[
                                            { icon: <ClockCircleOutlined />, text: courseData.duration },
                                            { icon: <BookOutlined />, text: `${courseData.lessonCount} bài học` },
                                            { icon: <UserOutlined />, text: courseData.level },
                                            { icon: <GlobalOutlined />, text: courseData.language }
                                        ]}
                                        renderItem={(item) => (
                                            <List.Item style={{ padding: '8px 0', border: 'none' }}>
                                                <Space>
                                                    {item.icon}
                                                    <Text>{item.text}</Text>
                                                </Space>
                                            </List.Item>
                                        )}
                                    />
                                </div>

                                <Divider />

                                {/* Các tính năng */}
                                <div className="course-features">
                                    <List
                                        dataSource={[
                                            { icon: <ApiOutlined />, text: "Truy cập trọn đời" },
                                            { icon: <TrophyOutlined />, text: "Chứng nhận hoàn thành" },
                                            { icon: <SafetyOutlined />, text: "30 ngày hoàn tiền" }
                                        ]}
                                        renderItem={(item) => (
                                            <List.Item style={{ padding: '8px 0', border: 'none' }}>
                                                <Space>
                                                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                                                    {item.icon}
                                                    <Text>{item.text}</Text>
                                                </Space>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CourseDetail;
