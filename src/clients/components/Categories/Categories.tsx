import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import {
    CodeOutlined,
    DesktopOutlined,
    BulbOutlined,
    CameraOutlined,
    DollarOutlined,
    HeartOutlined,
    RocketOutlined,
    DatabaseOutlined
} from '@ant-design/icons';
import './Categories.scss';

const { Title, Paragraph } = Typography;

const categories = [
    {
        id: 1,
        title: 'Lập trình',
        description: 'JavaScript, Python, React, Node.js',
        icon: <CodeOutlined />,
        color: '#1890ff',
        courses: '25+ khóa học'
    },
    {
        id: 2,
        title: 'Thiết kế',
        description: 'UI/UX, Photoshop, Figma',
        icon: <DesktopOutlined />,
        color: '#722ed1',
        courses: '18+ khóa học'
    },
    {
        id: 3,
        title: 'Marketing',
        description: 'Digital Marketing, SEO, Social Media',
        icon: <BulbOutlined />,
        color: '#fa8c16',
        courses: '12+ khóa học'
    },
    {
        id: 4,
        title: 'Nhiếp ảnh',
        description: 'Portrait, Landscape, Wedding',
        icon: <CameraOutlined />,
        color: '#eb2f96',
        courses: '8+ khóa học'
    },
    {
        id: 5,
        title: 'Kinh doanh',
        description: 'Startup, Leadership, Management',
        icon: <DollarOutlined />,
        color: '#52c41a',
        courses: '15+ khóa học'
    },
    {
        id: 6,
        title: 'Sức khỏe',
        description: 'Yoga, Fitness, Nutrition',
        icon: <HeartOutlined />,
        color: '#f5222d',
        courses: '10+ khóa học'
    },
    {
        id: 7,
        title: 'Khoa học',
        description: 'Data Science, AI, Machine Learning',
        icon: <RocketOutlined />,
        color: '#13c2c2',
        courses: '20+ khóa học'
    },
    {
        id: 8,
        title: 'Cơ sở dữ liệu',
        description: 'MySQL, MongoDB, PostgreSQL',
        icon: <DatabaseOutlined />,
        color: '#2f54eb',
        courses: '12+ khóa học'
    }
];

const Categories: React.FC = () => {
    const handleCategoryClick = (categoryId: number) => {
        console.log('Category clicked:', categoryId);
        // Navigate to category page
    };

    return (
        <div className="categories-section">
            <div className="container">
                <Row justify="center">
                    <Col span={24} style={{ textAlign: 'center', marginBottom: 48 }}>
                        <Title level={2} className="section-title">
                            Danh mục phổ biến
                        </Title>
                        <Paragraph className="section-description">
                            Khám phá các lĩnh vực học tập đa dạng và tìm kiếm đam mê của bạn
                        </Paragraph>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    {categories.map((category) => (
                        <Col key={category.id} xs={12} sm={8} md={6} lg={6}>
                            <Card
                                hoverable
                                className="category-card"
                                onClick={() => handleCategoryClick(category.id)}
                                bodyStyle={{ padding: '24px' }}
                            >
                                <div className="category-content">
                                    <div
                                        className="category-icon"
                                        style={{ color: category.color }}
                                    >
                                        {category.icon}
                                    </div>
                                    <Title level={4} className="category-title">
                                        {category.title}
                                    </Title>
                                    <Paragraph className="category-description">
                                        {category.description}
                                    </Paragraph>
                                    <div className="category-count">
                                        {category.courses}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Categories;
