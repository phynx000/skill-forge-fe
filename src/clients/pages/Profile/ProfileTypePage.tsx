import React from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { UserOutlined, TrophyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './UserProfile.scss';

const { Title, Text } = Typography;

const ProfileTypePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="profile-type-page">
            <div className="profile-type-container">
                <div className="profile-type-header">
                    <Title level={2} style={{ textAlign: 'center', marginBottom: 8 }}>
                        Chọn loại tài khoản
                    </Title>
                    <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 40 }}>
                        Xem trang thông tin người dùng theo vai trò
                    </Text>
                </div>

                <Row gutter={[32, 32]} justify="center">
                    <Col xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            className="profile-type-card student-card"
                            onClick={() => navigate('/profile/student/1')}
                        >
                            <div className="card-content">
                                <div className="card-icon">
                                    <UserOutlined />
                                </div>
                                <Title level={4} style={{ margin: '16px 0 8px 0', textAlign: 'center' }}>
                                    Học viên
                                </Title>
                                <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginBottom: 20 }}>
                                    Xem hồ sơ của học viên với thông tin khóa học, tiến độ học tập và chứng chỉ
                                </Text>
                                <ul className="feature-list">
                                    <li>📚 Khóa học đã tham gia</li>
                                    <li>📊 Tiến độ học tập</li>
                                    <li>🏆 Chứng chỉ đạt được</li>
                                    <li>⭐ Đánh giá khóa học</li>
                                </ul>
                                <Button type="primary" block size="large" className="view-profile-btn">
                                    Xem hồ sơ học viên
                                </Button>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            className="profile-type-card instructor-card"
                            onClick={() => navigate('/profile/instructor/1')}
                        >
                            <div className="card-content">
                                <div className="card-icon">
                                    <TrophyOutlined />
                                </div>
                                <Title level={4} style={{ margin: '16px 0 8px 0', textAlign: 'center' }}>
                                    Giảng viên
                                </Title>
                                <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginBottom: 20 }}>
                                    Xem hồ sơ của giảng viên với thông tin khóa học, học viên và doanh thu
                                </Text>
                                <ul className="feature-list">
                                    <li>📖 Khóa học đã tạo</li>
                                    <li>👥 Học viên đã dạy</li>
                                    <li>💰 Doanh thu và thống kê</li>
                                    <li>⭐ Đánh giá từ học viên</li>
                                </ul>
                                <Button type="primary" block size="large" className="view-profile-btn">
                                    Xem hồ sơ giảng viên
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <Button onClick={() => navigate('/')} size="large">
                        Quay về trang chủ
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileTypePage;
