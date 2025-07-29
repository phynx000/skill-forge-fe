import { Layout, Typography, Button, Row, Col, Space } from 'antd';
import { PlayCircleOutlined, RocketOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Banner.scss';

const { Title, Paragraph } = Typography;

const BannerHomePage = () => {
    const { Content } = Layout;
    const navigate = useNavigate();

    const handleStartLearning = () => {
        navigate('/list-course');
    };

    return (
        <div className="home-banner">
            <Layout style={{ padding: '40px 24px' }}>
                <Content className="banner-content">
                    <Row align="middle" justify="center" gutter={[48, 32]}>
                        {/* Left Content */}
                        <Col xs={24} lg={12}>
                            <div className="banner-text">
                                <Title level={1} className="banner-title">
                                    Khám phá kiến thức,
                                    <br />
                                    <span className="highlight">Nâng tầm bản thân</span>
                                </Title>

                                <Paragraph className="banner-description">
                                    Tham gia cùng hàng nghìn học viên trên khắp thế giới.
                                    Học từ các chuyên gia hàng đầu với những khóa học chất lượng cao,
                                    cập nhật xu hướng mới nhất trong ngành.
                                </Paragraph>

                                <Space size="large" className="banner-actions">
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<RocketOutlined />}
                                        className="cta-button"
                                        onClick={handleStartLearning}
                                    >
                                        Bắt đầu học ngay
                                    </Button>
                                    <Button
                                        size="large"
                                        icon={<PlayCircleOutlined />}
                                        className="demo-button"
                                    >
                                        Xem demo
                                    </Button>
                                </Space>

                                <div className="banner-stats">
                                    <Row gutter={24}>
                                        <Col span={8}>
                                            <div className="stat-item">
                                                <Title level={3} className="stat-number">50+</Title>
                                                <Paragraph className="stat-label">Khóa học</Paragraph>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div className="stat-item">
                                                <Title level={3} className="stat-number">1000+</Title>
                                                <Paragraph className="stat-label">Học viên</Paragraph>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div className="stat-item">
                                                <Title level={3} className="stat-number">4.8★</Title>
                                                <Paragraph className="stat-label">Đánh giá</Paragraph>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>

                        {/* Right Content */}
                        <Col xs={24} lg={12}>
                            <div className="banner-visual">
                                <div className="hero-image">
                                    <img
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                                        alt="Students learning"
                                        className="main-image"
                                    />
                                    {/* Floating cards */}
                                    <div className="floating-card card-1">
                                        <BookOutlined />
                                        <span>Học mọi lúc, mọi nơi</span>
                                    </div>
                                    <div className="floating-card card-2">
                                        <RocketOutlined />
                                        <span>Nâng cao kỹ năng</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </div>
    );
};

export default BannerHomePage;