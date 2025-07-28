import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { ArrowRightOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './CallToAction.scss';

const { Title, Paragraph } = Typography;

const CallToAction: React.FC = () => {
    const navigate = useNavigate();

    const handleExploreCourses = () => {
        navigate('/list-course');
    };

    return (
        <div className="cta-section">
            <div className="container">
                <Row align="middle" gutter={[48, 32]}>
                    <Col xs={24} lg={14}>
                        <div className="cta-content">
                            <Title level={2} className="cta-title">
                                Sẵn sàng bắt đầu hành trình học tập?
                            </Title>
                            <Paragraph className="cta-description">
                                Tham gia cùng hàng nghìn học viên đã thay đổi cuộc đời nhờ SkillForge.
                                Với hơn 1,000 khóa học chất lượng cao và đội ngũ giảng viên kinh nghiệm,
                                chúng tôi cam kết mang đến cho bạn những kiến thức thực tế nhất.
                            </Paragraph>

                            <div className="cta-features">
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Truy cập trọn đời</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Chứng chỉ hoàn thành</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Hỗ trợ 24/7</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Cộng đồng học tập</span>
                                </div>
                            </div>

                            <div className="cta-buttons">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="primary-cta-btn"
                                    icon={<ArrowRightOutlined />}
                                    onClick={handleExploreCourses}
                                >
                                    Khám phá khóa học
                                </Button>
                                <Button
                                    size="large"
                                    className="secondary-cta-btn"
                                    icon={<PlayCircleOutlined />}
                                >
                                    Xem demo
                                </Button>
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} lg={10}>
                        <div className="cta-visual">
                            <div className="cta-image-container">
                                <div className="floating-card card-1">
                                    <div className="card-content">
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: '75%' }}></div>
                                        </div>
                                        <span className="card-text">React Advanced - 75%</span>
                                    </div>
                                </div>

                                <div className="floating-card card-2">
                                    <div className="card-content">
                                        <div className="achievement-icon">🏆</div>
                                        <span className="card-text">Certificate Earned</span>
                                    </div>
                                </div>

                                <div className="floating-card card-3">
                                    <div className="card-content">
                                        <div className="stat-number">2,500+</div>
                                        <span className="card-text">Students</span>
                                    </div>
                                </div>

                                <div className="main-visual">
                                    <div className="visual-circle"></div>
                                    <div className="visual-dots">
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                        <span className="dot"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CallToAction;
