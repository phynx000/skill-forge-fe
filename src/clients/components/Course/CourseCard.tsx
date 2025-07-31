import React from 'react';
import { Card, Rate, Button, Typography, Space, Avatar, Tag } from 'antd';
import { UserOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './CourseCard.scss';

const { Text, Title } = Typography;

export interface CourseData {
    id: string;
    title: string;
    instructor: string;
    instructorAvatar?: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    studentCount: number;
    thumbnail: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    isBestseller?: boolean;
    isNew?: boolean;
}

interface CourseCardProps {
    course: CourseData;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
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
            className="course-card"
            cover={
                <div className="course-thumbnail">
                    <img
                        alt={title}
                        src={thumbnail}
                        style={{
                            width: '100%',
                            height: '180px',
                            objectFit: 'cover'
                        }}
                    />
                    <div className="course-duration-overlay">
                        <PlayCircleOutlined /> {duration}
                    </div>
                    {(isBestseller || isNew) && (
                        <div className="course-badges">
                            {isBestseller && <Tag color="orange">Bestseller</Tag>}
                            {isNew && <Tag color="green">New</Tag>}
                        </div>
                    )}
                </div>
            }
            actions={[
                <Button
                    type="primary"
                    onClick={handleViewDetails}
                    style={{ margin: '0 auto', padding: '10px 30px' }}
                    className="view-details-button"
                >
                    Xem chi tiết
                </Button>
            ]}
        >
            <div className="course-content">
                <Title level={5} className="course-title" style={{ marginBottom: 8 }}>
                    {title}
                </Title>

                <div className="course-instructor" style={{ marginBottom: 8 }}>
                    <Space>
                        <Avatar
                            size="small"
                            src={instructorAvatar}
                            icon={<UserOutlined />}
                        />
                        <Text type="secondary">{instructor}</Text>
                    </Space>
                </div>

                <div className="course-rating" style={{ marginBottom: 8 }}>
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

                <div className="course-stats" style={{ marginBottom: 12 }}>
                    <Space split={<Text type="secondary">•</Text>}>
                        <Text type="secondary">{formatStudentCount(studentCount)} học viên</Text>
                        <Text type="secondary">{level}</Text>
                    </Space>
                </div>

                <div className="course-price">
                    <Space>
                        <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                            {formatPrice(price)}
                        </Text>
                        {originalPrice && originalPrice > price && (
                            <Text
                                delete
                                type="secondary"
                                style={{ fontSize: '14px' }}
                            >
                                {formatPrice(originalPrice)}
                            </Text>
                        )}
                    </Space>
                </div>
            </div>
        </Card>
    );
};

export default CourseCard;
