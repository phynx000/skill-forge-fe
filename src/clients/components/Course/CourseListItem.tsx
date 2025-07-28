import React from 'react';
import { Card, Rate, Button, Typography, Space, Avatar, Tag, Row, Col } from 'antd';
import { UserOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { CourseData } from './CourseCard';

const { Text, Title } = Typography;

interface CourseListItemProps {
    course: CourseData;
}

const CourseListItem: React.FC<CourseListItemProps> = ({ course }) => {
    const navigate = useNavigate();

    const {
        id,
        title,
        instructor,
        instructorAvatar,
        price,
        originalPrice,
        rating,
        reviewCount,
        studentCount,
        thumbnail,
        duration,
        level,
        isBestseller,
        isNew
    } = course;

    const handleViewDetails = () => {
        navigate(`/course/${id}`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const formatStudentCount = (count: number) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count.toString();
    };

    return (
        <Card
            hoverable
            className="course-list-item"
            style={{ marginBottom: 16 }}
        >
            <Row gutter={16}>
                {/* Course Thumbnail */}
                <Col span={6}>
                    <div className="course-thumbnail" style={{ position: 'relative' }}>
                        <img
                            alt={title}
                            src={thumbnail}
                            style={{
                                width: '100%',
                                height: '140px',
                                objectFit: 'cover',
                                borderRadius: '6px'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <PlayCircleOutlined /> {duration}
                        </div>
                        {(isBestseller || isNew) && (
                            <div style={{
                                position: 'absolute',
                                top: '8px',
                                left: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px'
                            }}>
                                {isBestseller && <Tag color="orange">Bestseller</Tag>}
                                {isNew && <Tag color="green">New</Tag>}
                            </div>
                        )}
                    </div>
                </Col>

                {/* Course Content */}
                <Col span={12}>
                    <div>
                        <Title level={4} style={{ marginBottom: 8, lineHeight: 1.3 }}>
                            {title}
                        </Title>

                        <div style={{ marginBottom: 8 }}>
                            <Space>
                                <Avatar
                                    size="small"
                                    src={instructorAvatar}
                                    icon={<UserOutlined />}
                                />
                                <Text type="secondary">{instructor}</Text>
                            </Space>
                        </div>

                        <div style={{ marginBottom: 8 }}>
                            <Space>
                                <Text strong style={{ color: '#f39800' }}>{rating}</Text>
                                <Rate
                                    disabled
                                    defaultValue={rating}
                                    allowHalf
                                    style={{ fontSize: '14px' }}
                                />
                                <Text type="secondary">({reviewCount.toLocaleString()})</Text>
                            </Space>
                        </div>

                        <div style={{ marginBottom: 12 }}>
                            <Space split={<Text type="secondary">•</Text>}>
                                <Text type="secondary">{formatStudentCount(studentCount)} học viên</Text>
                                <Text type="secondary">{level}</Text>
                            </Space>
                        </div>

                        <Text type="secondary" style={{ fontSize: '14px', lineHeight: 1.4 }}>
                            Khóa học toàn diện giúp bạn nắm vững kiến thức từ cơ bản đến nâng cao.
                            Phù hợp cho người mới bắt đầu và những ai muốn nâng cao kỹ năng chuyên môn.
                        </Text>
                    </div>
                </Col>

                {/* Price and Action */}
                <Col span={6} style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            <div>
                                <Text strong style={{ fontSize: '20px', color: '#1890ff' }}>
                                    {formatPrice(price)}
                                </Text>
                            </div>
                            {originalPrice && originalPrice > price && (
                                <div>
                                    <Text
                                        delete
                                        type="secondary"
                                        style={{ fontSize: '14px' }}
                                    >
                                        {formatPrice(originalPrice)}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        type="primary"
                        size="large"
                        onClick={handleViewDetails}
                        style={{ width: '100%' }}
                    >
                        Xem chi tiết
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default CourseListItem;
