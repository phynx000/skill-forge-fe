import React, { useEffect, useState } from 'react';
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
    Alert,
    Modal,
    Tag
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
    HeartOutlined,
    TeamOutlined
} from '@ant-design/icons';
import './CourseDetail.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDetailCourse } from '../../../hooks/useDetailCourse';
import { useLessonDetail } from '../../../hooks/useLessonDetail';
import { useUserBio } from '../../../hooks/useUserBio';
import useEnrollmentStatus from '../../../hooks/useEnrollmentStatus';
import useEnrollment from '../../../hooks/useEnrollment';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const CourseDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch course data from API
    const { courseDetail, loading, error } = useDetailCourse(Number(id));

    // State cho lesson modal
    const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
    const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);

    // Fetch lesson detail khi có lesson được chọn
    const { lessonDetail, loading: lessonLoading } = useLessonDetail(selectedLessonId);

    // Check enrollment status
    const {
        isEnrolled,
        enrollmentLoading,
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

    // Fetch instructor bio
    const { userBio, loading: bioLoading } = useUserBio(course?.instructor?.id || null);

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

    const handleLessonClick = (lessonId: number) => {
        setSelectedLessonId(lessonId);
        setIsVideoModalVisible(true);
    };

    const handleCloseVideoModal = () => {
        setIsVideoModalVisible(false);
        setSelectedLessonId(null);
    };

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
                                            <Text strong>{userBio?.data.fullName}</Text>
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
                                                        <List.Item
                                                            style={{
                                                                padding: '8px 20px',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                transition: 'background-color 0.2s'
                                                            }}
                                                            className="lesson-item"
                                                            onClick={() => handleLessonClick(lesson.id)}
                                                        >
                                                            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                                                <Space>
                                                                    <PlayCircleOutlined style={{ color: '#1890ff' }} />
                                                                    <Text>{lesson.title}</Text>
                                                                </Space>
                                                                <Text type="secondary">Xem trước</Text>
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

                            <Divider />

                            {/* Thông tin giảng viên chi tiết */}
                            <div className="instructor-bio">
                                <Title level={3}>Về giảng viên</Title>
                                {bioLoading ? (
                                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                        <Spin size="small" />
                                        <div style={{ marginTop: 8 }}>Đang tải thông tin giảng viên...</div>
                                    </div>
                                ) : userBio?.data ? (
                                    <Card className="instructor-details" bordered={false}>
                                        <div className="instructor-header">
                                            <Space size="large">
                                                <Avatar size={64} src={course.instructor.avatar} />
                                                <div>
                                                    <Title level={4}>{userBio.data.fullName}</Title>
                                                    <Text type="secondary">{course.instructor.title}</Text>
                                                    {userBio.data.description && (
                                                        <div style={{ marginTop: 8 }}>
                                                            <Text>{userBio.data.description}</Text>
                                                        </div>
                                                    )}
                                                </div>
                                            </Space>
                                        </div>

                                        {/* Kỹ năng */}
                                        {userBio.data.skills && userBio.data.skills.length > 0 && (
                                            <div style={{ marginTop: 24 }}>
                                                <Title level={5}>Kỹ năng chuyên môn</Title>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                    {userBio.data.skills.map((skill) => (
                                                        <Tag
                                                            key={skill.id}
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px',
                                                                padding: '4px 8px',
                                                                borderRadius: '6px'
                                                            }}
                                                        >
                                                            <img
                                                                src={skill.logo}
                                                                alt={skill.name}
                                                                style={{ width: 16, height: 16 }}
                                                            />
                                                            {skill.name}
                                                        </Tag>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Học vấn */}
                                        {userBio.data.education && userBio.data.education.length > 0 && (
                                            <div style={{ marginTop: 24 }}>
                                                <Title level={5}>Học vấn</Title>
                                                <List
                                                    dataSource={userBio.data.education.slice(0, 3)} // Hiển thị tối đa 3 bằng cấp
                                                    renderItem={(edu) => (
                                                        <List.Item style={{ padding: '8px 0', border: 'none' }}>
                                                            <Space>
                                                                <TeamOutlined style={{ color: '#1890ff' }} />
                                                                <div>
                                                                    <Text strong>{edu.degree} {edu.major}</Text>
                                                                    <br />
                                                                    <Text type="secondary">{edu.institution} • {edu.year}</Text>
                                                                </div>
                                                            </Space>
                                                        </List.Item>
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </Card>
                                ) : (
                                    <Card bordered={false}>
                                        <div className="instructor-header">
                                            <Space size="large">
                                                <Avatar size={64} src={course.instructor.avatar} />
                                                <div>
                                                    <Title level={4}>{course.instructor.name}</Title>
                                                    <Text type="secondary">{course.instructor.title}</Text>
                                                    <div style={{ marginTop: 8 }}>
                                                        <Text type="secondary">Thông tin chi tiết về giảng viên đang được cập nhật</Text>
                                                    </div>
                                                </div>
                                            </Space>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </Col >

                    {/* Phần bên phải - Sidebar */}
                    <Col Col Col xs={24} lg={8} >
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
                    </Col >
                </Row >
            </div >

            {/* Modal để hiển thị video preview */}
            <Modal
                title={lessonDetail?.data?.title || "Preview Bài học"}
                open={isVideoModalVisible}
                onCancel={handleCloseVideoModal}
                footer={null}
                width="80%"
                style={{ top: 20 }}
                destroyOnClose={true}
            >
                {
                    lessonLoading ? (
                        <div style={{ textAlign: 'center', padding: '50px 0' }} >
                            <Spin size="large" />
                            <div style={{ marginTop: 16 }}>Đang tải video...</div>
                        </div >
                    ) : lessonDetail?.data?.videoUrl ? (
                        <VideoPlayer
                            key={selectedLessonId}
                            videoUrl={lessonDetail.data.videoUrl}
                            autoPlay={true}
                            onReady={() => console.log(`Preview bài học "${lessonDetail.data.title}" đã sẵn sàng!`)}
                        />
                    ) : (
                        <Alert
                            message="Không thể tải video"
                            description="Video preview không khả dụng cho bài học này."
                            type="warning"
                            showIcon
                        />
                    )}
            </Modal >
        </div >
    );
};

export default CourseDetailPage;
