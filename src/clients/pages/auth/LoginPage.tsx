import React, { useEffect, useCallback } from 'react';
import {
    Form,
    Input,
    Button,
    Typography,
    Divider,
    Card,
    Checkbox,
    Alert
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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/authcontext';
import type { LoginCredentials } from '../../../types/auth';
import './Auth.scss';

const { Title, Text } = Typography;

interface LoginFormData extends LoginCredentials {
    remember: boolean;
}

const LoginPage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();

    // Use AuthContext
    const { login, loading, error, clearError, isAuthenticated } = useAuth();

    // Redirect if already authenticated - ONLY ONCE
    useEffect(() => {
        if (isAuthenticated) {
            console.log('✅ Already authenticated, redirecting...');
            const from = (location.state as { from?: Location })?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location.state]);

    // Clear error when component mounts - ONLY ONCE
    useEffect(() => {
        clearError();
    }, []); // Empty dependency array

    // Handle login with useCallback to prevent re-creation
    const handleLogin = useCallback(async (values: LoginFormData) => {
        try {
            clearError();

            const credentials: LoginCredentials = {
                username: values.username,
                password: values.password
            };

            console.log('🔐 Login form submitted:', credentials.username);
            const success = await login(credentials);

            if (success) {
                // Handle remember me
                if (values.remember) {
                    localStorage.setItem('skillforge_remember', 'true');
                } else {
                    localStorage.removeItem('skillforge_remember');
                }

                console.log('✅ Login successful, will redirect via useEffect');
                // Don't navigate here - let useEffect handle it
            }
        } catch (err) {
            console.error('❌ Login form error:', err);
        }
    }, [login, clearError]); // Only depend on login and clearError

    // Handle social login
    const handleSocialLogin = useCallback((provider: 'google' | 'facebook') => {
        // TODO: Implement social login logic
        console.log(`Social login with ${provider}`);
    }, []);

    // Show loading state
    if (loading) {
        return (
            <div className="auth-page">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}>
                    <div>Loading...</div>
                </div>
            </div>
        );
    }

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

                            {/* Show error if exists */}
                            {error && (
                                <Alert
                                    message="Lỗi đăng nhập"
                                    description={error}
                                    type="error"
                                    showIcon
                                    closable
                                    onClose={clearError}
                                    style={{ marginBottom: 16 }}
                                />
                            )}

                            {/* Social Login Buttons */}
                            <div className="social-login">
                                <Button
                                    size="large"
                                    block
                                    icon={<GoogleOutlined />}
                                    className="google-btn"
                                    onClick={() => handleSocialLogin('google')}
                                    disabled={loading}
                                >
                                    Đăng nhập bằng Google
                                </Button>
                                <Button
                                    size="large"
                                    block
                                    icon={<FacebookOutlined />}
                                    className="facebook-btn"
                                    onClick={() => handleSocialLogin('facebook')}
                                    disabled={loading}
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
                                initialValues={{
                                    remember: localStorage.getItem('skillforge_remember') === 'true'
                                }}
                            >
                                <Form.Item
                                    name="username"
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
                                        disabled={loading}
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
                                        disabled={loading}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox disabled={loading}>
                                                Ghi nhớ đăng nhập
                                            </Checkbox>
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
                                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
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