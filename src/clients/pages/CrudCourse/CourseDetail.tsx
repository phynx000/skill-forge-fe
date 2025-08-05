import React, { useEffect } from 'react';
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
    Image,
    Spin,
    Alert
} from 'antd';
import {
    CheckOutlined,
    CheckCircleOutlined,
    PlayCircleOutlined,
    ClockCircleOutlined,
    UserOutlined,
    BookOutlined,
    GlobalOutlined,
    ShoppingCartOutlined,
    HeartOutlined
} from '@ant-design/icons';
import './CourseDetail.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailCourse } from '../../../hooks/useDetailCourse';
import useEnrollmentStatus from '../../../hooks/useEnrollmentStatus';
import useEnrollment from '../../../hooks/useEnrollment';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const CourseDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch course data from API
    const { courseDetail, loading, error } = useDetailCourse(Number(id));

    // Check enrollment status
    const {
        isEnrolled,
        enrollmentLoading,
        enrollmentError,
        checkEnrollmentStatus
    } = useEnrollmentStatus();

    // Handle enrollment
    const { enrolling, handleEnroll } = useEnrollment(
        (enrollment) => {
            console.log('✅ Enrolled successfully:', enrollment);
            // Refresh enrollment status after successful enrollment
            if (id) {
                checkEnrollmentStatus(Number(id));
            }
        },
        (error) => {
            console.error('❌ Enrollment failed:', error);
            // Don't redirect on enrollment error - let user try again
        }
    );

    // Extract course data
    const course = courseDetail?.data;

    // Check enrollment status when component mounts or courseId changes
    useEffect(() => {
        if (id) {
            checkEnrollmentStatus(Number(id));
        }
    }, [id, checkEnrollmentStatus]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Temporarily commented out discount calculation
    // const calculateDiscount = () => {
    //     if (!course || course.originalPrice === 0) return 0;
    //     return Math.round(((course.originalPrice - course.discountPrice) / course.originalPrice) * 100);
    // };

    const handleStartLearning = () => {
        navigate(`/course/${id}/learn`);
    }

    const handlePurchase = async () => {
        if (!id) return;
        // Check if course is free
        if (course && course.originalPrice === 0) {
            // Free course - enroll directly
            await handleEnroll(Number(id));
        } else {
            // Paid course - redirect to checkout
            navigate(`/checkout?courseId=${id}`);
        }
    };


    if (loading) {
        return (
            <div className="course-detail-page">
                <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <Spin size="large" />
                    <div style={{ marginTop: 16 }}>Đang tải thông tin khóa học...</div>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="course-detail-page">
                <div className="container" style={{ padding: '50px 0' }}>
                    <Alert
                        message="Lỗi"
                        description={error || "Không thể tải thông tin khóa học"}
                        type="error"
                        showIcon
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="course-detail-page">
            <div className="container">
                <Row gutter={[24, 24]} align="top">
                    {/* Phần bên trái - Nội dung chính */}
                    <Col xs={24} lg={16}>
                        <div className="course-content">
                            {/* Header */}
                            <div className="course-header">
                                <Title level={1} className="course-title">
                                    {course.title}
                                </Title>

                                <Paragraph className="course-description">
                                    {course.shortDescription || course.description}
                                </Paragraph>

                                {/* Thông tin giảng viên */}
                                <div className="instructor-info">
                                    <Space size="middle">
                                        <Avatar size={48} src={course.instructor.avatar} />
                                        <div>
                                            <Text strong>{course.instructor.name}</Text>
                                            <br />
                                            <Text type="secondary">{course.instructor.title}</Text>
                                        </div>
                                    </Space>
                                    <Text type="secondary" className="last-updated">
                                        Cập nhật: {course.lastUpdated || 'Tháng 12, 2024'}
                                    </Text>
                                </div>

                                {/* Thông tin đánh giá */}
                                <div className="rating-info">
                                    <Space size="middle" wrap>
                                        <Space>
                                            <Rate disabled defaultValue={course.rating} allowHalf />
                                            <Text strong>{course.rating}</Text>
                                        </Space>
                                        <Text>({course.reviewCount.toLocaleString()} đánh giá)</Text>
                                        <Text>Cấp độ: {course.level}</Text>
                                    </Space>
                                </div>
                            </div>

                            <Divider />

                            {/* Bạn sẽ học được gì */}
                            <div className="what-you-learn">
                                <Title level={3}>Bạn sẽ học được gì</Title>
                                <Row gutter={[16, 8]}>
                                    {course.whatYouLearn.map((item: string, index: number) => (
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
                                    {course.sections.length} chương • {course.lessonCount} bài học •
                                    {course.duration} tổng thời lượng
                                </Text>

                                <Collapse>
                                    {course.sections.map((section) => (
                                        <Panel
                                            header={
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                    <Text strong>{section.title}</Text>
                                                    <Text type="secondary">
                                                        {section.lessons.length} bài học
                                                    </Text>
                                                </div>
                                            }
                                            key={section.id}
                                        >
                                            {section.lessons.length > 0 ? (
                                                <List
                                                    dataSource={section.lessons}
                                                    renderItem={(lesson) => (
                                                        <List.Item style={{ padding: '8px 20px', border: 'none' }}>
                                                            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                                                <Space>
                                                                    {/* <PlayCircleOutlined /> */}
                                                                    <Text>{lesson.title}</Text>
                                                                </Space>
                                                                {/* <Text type="secondary">#{lesson.id}</Text> */}
                                                            </Space>
                                                        </List.Item>
                                                    )}
                                                />
                                            ) : (
                                                <Text type="secondary" style={{ fontStyle: 'italic' }}>
                                                    Chưa có bài học nào trong chương này
                                                </Text>
                                            )}
                                        </Panel>
                                    ))}
                                </Collapse>
                            </div>

                            <Divider />

                            {/* Mô tả chi tiết */}

                            <div className="course-description-detail">
                                <Title level={3}>Mô tả</Title>
                                <div className="description-content">
                                    <p>{course.description}</p>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Phần bên phải - Sidebar */}
                    <Col xs={24} lg={8}>
                        <div className="course-sidebar" style={{ position: 'sticky', top: '24px' }}>
                            <Card className="purchase-card">
                                {/* Thumbnail */}
                                <div className="course-thumbnail">
                                    <Image
                                        src={course.thumbnailUrl}
                                        alt={course.title}
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
                                        <Text className="current-price">
                                            {course.originalPrice > 0 ? formatPrice(course.originalPrice) : 'Miễn phí'}
                                        </Text>
                                        {/* Temporarily hide discount price and discount tag */}
                                        {/* {course.originalPrice > 0 && course.originalPrice !== course.discountPrice && (
                                            <>
                                                <Text delete type="secondary" className="original-price">
                                                    {formatPrice(course.originalPrice)}
                                                </Text>
                                                <Tag color="red" className="discount-tag">
                                                    -{calculateDiscount()}%
                                                </Tag>
                                            </>
                                        )} */}
                                    </Space>
                                </div>

                                {/* Buttons */}
                                <div className="action-buttons">
                                    {enrollmentLoading ? (
                                        <Button
                                            size="large"
                                            block
                                            loading
                                            className="buy-button"
                                        >
                                            Đang kiểm tra...
                                        </Button>
                                    ) : isEnrolled ? (
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
                                    ) : (
                                        /* User is not enrolled OR enrollment check failed - Show purchase buttons */
                                        <>
                                            <Button
                                                type="primary"
                                                size="large"
                                                block
                                                className="buy-button"
                                                icon={<ShoppingCartOutlined />}
                                                loading={enrolling}
                                                onClick={handlePurchase}
                                            >
                                                {enrolling ? 'Đang xử lý...' :
                                                    (course.originalPrice === 0) ? 'Đăng ký miễn phí' : 'Mua ngay'}
                                            </Button>
                                            <Button
                                                size="large"
                                                block
                                                className="cart-button"
                                                icon={<HeartOutlined />}
                                            >
                                                Thêm vào yêu thích
                                            </Button>
                                        </>
                                    )}
                                </div>

                                <Divider />

                                {/* Thông tin khóa học */}
                                <div className="course-info">
                                    <Title level={5}>Khóa học bao gồm:</Title>
                                    <List
                                        dataSource={[
                                            { icon: <ClockCircleOutlined />, text: course.duration },
                                            { icon: <BookOutlined />, text: `${course.lessonCount} bài học` },
                                            { icon: <UserOutlined />, text: course.level },
                                            { icon: <GlobalOutlined />, text: course.language }
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
                                {/* Show enrollment status only when enrolled */}
                                {isEnrolled && (
                                    <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f6ffed', borderRadius: 6, border: '1px solid #4e7e29' }}>
                                        <Space>
                                            <CheckCircleOutlined style={{ color: '#5d9b3d' }} />
                                            <Text type="success">Bạn đã đăng ký khóa học này</Text>
                                        </Space>
                                    </div>
                                )}

                                {/* Show enrollment check error only if it's a real error (not 404)
                                {enrollmentError && enrollmentError !== 'User is not enrolled' && (
                                    <Alert
                                        message="Không thể kiểm tra trạng thái đăng ký"
                                        description={`${enrollmentError}. Bạn vẫn có thể thử đăng ký khóa học.`}
                                        type="warning"
                                        showIcon
                                        closable
                                        style={{ marginTop: 16 }}
                                    />
                                )} */}


                                <Divider />


                                {/* Các tính năng */}
                                <div className="course-features">
                                    <List
                                        dataSource={course.features.map(feature => ({
                                            icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
                                            text: feature
                                        }))}
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
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CourseDetailPage;
