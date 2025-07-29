import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Typography,
    Divider,
    Card,
    Checkbox,
    message
} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    GoogleOutlined,
    FacebookOutlined,
    CheckCircleOutlined,
    BookOutlined,
    TrophyOutlined,
    UserAddOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';

const { Title, Text } = Typography;

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values: LoginFormData) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Login values:', values);
            message.success('Đăng nhập thành công!');

            // Navigate to homepage or dashboard
            navigate('/');
        } catch {
            message.error('Đăng nhập thất bại. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: 'google' | 'facebook') => {
        message.info(`Đăng nhập bằng ${provider === 'google' ? 'Google' : 'Facebook'}`);
        // Implement social login logic here
    };

    return (
        <div className="auth-page">
            {/* Nút quay về trang chủ */}
            <Link to="/">
                <Button className="home-button" icon={<HomeOutlined />}>
                    Về trang chủ
                </Button>
            </Link>

            <div className="auth-container">
                <div className="auth-layout">
                    {/* Phần giới thiệu SkillForge */}
                    <div className="auth-intro">
                        <div className="intro-logo">
                            <img src="/logo-skill-forge.png" alt="SkillForge" />
                            <span className="logo-text">SkillForge</span>
                        </div>

                        <Title level={1} className="intro-title">
                            Khám phá<br />
                            Tương lai của<br />
                            <span style={{ color: '#c800de' }}>Học tập</span>
                        </Title>

                        <Text className="intro-subtitle">
                            Nền tảng học trực tuyến hàng đầu với hàng nghìn khóa học chất lượng cao
                            từ các chuyên gia trong ngành.
                        </Text>

                        <ul className="intro-features">
                            <li>
                                <BookOutlined />
                                Hơn 10,000+ khóa học đa dạng
                            </li>
                            <li>
                                <TrophyOutlined />
                                Chứng chỉ được công nhận
                            </li>
                            <li>
                                <UserAddOutlined />
                                Cộng đồng học viên 500k+
                            </li>
                            <li>
                                <CheckCircleOutlined />
                                Học tập linh hoạt 24/7
                            </li>
                        </ul>

                        <div className="intro-stats">
                            <div className="stat-item">
                                <span className="stat-number">500K+</span>
                                <span className="stat-label">Học viên</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">10K+</span>
                                <span className="stat-label">Khóa học</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">98%</span>
                                <span className="stat-label">Hài lòng</span>
                            </div>
                        </div>
                    </div>

                    {/* Phần form đăng nhập */}
                    <div className="auth-form-section">
                        <Card className="auth-card">
                            <div className="auth-header">
                                <Title level={2} className="auth-title">
                                    Đăng nhập
                                </Title>
                                <Text type="secondary" className="auth-subtitle">
                                    Chào mừng bạn quay lại SkillForge
                                </Text>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="social-login">
                                <Button
                                    size="large"
                                    block
                                    icon={<GoogleOutlined />}
                                    className="google-btn"
                                    onClick={() => handleSocialLogin('google')}
                                >
                                    Đăng nhập bằng Google
                                </Button>
                                <Button
                                    size="large"
                                    block
                                    icon={<FacebookOutlined />}
                                    className="facebook-btn"
                                    onClick={() => handleSocialLogin('facebook')}
                                >
                                    Đăng nhập bằng Facebook
                                </Button>
                            </div>

                            <Divider>
                                <Text type="secondary">hoặc</Text>
                            </Divider>

                            {/* Login Form */}
                            <Form
                                form={form}
                                name="login"
                                onFinish={handleLogin}
                                autoComplete="off"
                                layout="vertical"
                                size="large"
                            >
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Nhập email của bạn"
                                        className="auth-input"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Mật khẩu"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                        { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Nhập mật khẩu"
                                        className="auth-input"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                                        </Form.Item>
                                        <Link to="/forgot-password" className="forgot-link">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        size="large"
                                        loading={loading}
                                        className="auth-submit-btn"
                                    >
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                            </Form>

                            <div className="auth-footer">
                                <Text type="secondary">
                                    Chưa có tài khoản? {' '}
                                    <Link to="/register" className="auth-link">
                                        Đăng ký ngay
                                    </Link>
                                </Text>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
