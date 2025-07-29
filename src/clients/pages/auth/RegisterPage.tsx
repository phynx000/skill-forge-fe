import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Typography,
    Divider,
    Card,
    Checkbox,
    message,
    Progress
} from 'antd';
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    GoogleOutlined,
    FacebookOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    CheckCircleOutlined,
    RocketOutlined,
    HeartOutlined,
    StarOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';

const { Title, Text } = Typography;

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
}

const RegisterPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 25;
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(password)) strength += 25;
        return strength;
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 25) return '#ff4d4f';
        if (passwordStrength <= 50) return '#fa8c16';
        if (passwordStrength <= 75) return '#faad14';
        return '#52c41a';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 25) return 'Yếu';
        if (passwordStrength <= 50) return 'Trung bình';
        if (passwordStrength <= 75) return 'Mạnh';
        return 'Rất mạnh';
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordStrength(checkPasswordStrength(value));
    };

    const handleRegister = async (values: RegisterFormData) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Register values:', values);
            message.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');

            // Navigate to login page
            navigate('/login');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            message.error('Đăng ký thất bại. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialRegister = (provider: 'google' | 'facebook') => {
        message.info(`Đăng ký bằng ${provider === 'google' ? 'Google' : 'Facebook'}`);
        // Implement social register logic here
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
                            Bắt đầu<br />
                            Hành trình<br />
                            <span style={{ color: '#c800de' }}>Học tập</span>
                        </Title>

                        <Text className="intro-subtitle">
                            Tham gia cộng đồng hơn 500,000 học viên đang học tập và phát triển
                            kỹ năng cùng SkillForge.
                        </Text>

                        <ul className="intro-features">
                            <li>
                                <RocketOutlined />
                                Khởi đầu sự nghiệp mới
                            </li>
                            <li>
                                <StarOutlined />
                                Chứng chỉ có giá trị
                            </li>
                            <li>
                                <HeartOutlined />
                                Học từ chuyên gia hàng đầu
                            </li>
                            <li>
                                <CheckCircleOutlined />
                                Hỗ trợ học tập 24/7
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
                                <span className="stat-label">Thành công</span>
                            </div>
                        </div>
                    </div>

                    {/* Phần form đăng ký */}
                    <div className="auth-form-section">
                        <Card className="auth-card">
                            <div className="auth-header">
                                <Title level={2} className="auth-title">
                                    Đăng ký
                                </Title>
                                <Text type="secondary" className="auth-subtitle">
                                    Tạo tài khoản SkillForge miễn phí
                                </Text>
                            </div>

                            {/* Social Register Buttons */}
                            <div className="social-login">
                                <Button
                                    size="large"
                                    block
                                    icon={<GoogleOutlined />}
                                    className="google-btn"
                                    onClick={() => handleSocialRegister('google')}
                                >
                                    Đăng ký bằng Google
                                </Button>
                                <Button
                                    size="large"
                                    block
                                    icon={<FacebookOutlined />}
                                    className="facebook-btn"
                                    onClick={() => handleSocialRegister('facebook')}
                                >
                                    Đăng ký bằng Facebook
                                </Button>
                            </div>

                            <Divider>
                                <Text type="secondary">hoặc</Text>
                            </Divider>

                            {/* Register Form */}
                            <Form
                                form={form}
                                name="register"
                                onFinish={handleRegister}
                                autoComplete="off"
                                layout="vertical"
                                size="large"
                            >
                                <Form.Item
                                    name="username"
                                    label="Tên người dùng"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tên người dùng!' },
                                        { min: 3, message: 'Tên người dùng phải có ít nhất 3 ký tự!' },
                                        { max: 20, message: 'Tên người dùng không được quá 20 ký tự!' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: 'Tên người dùng chỉ được chứa chữ, số và dấu gạch dưới!' }
                                    ]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Nhập tên người dùng"
                                        className="auth-input"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input
                                        prefix={<MailOutlined />}
                                        placeholder="Nhập email của bạn"
                                        className="auth-input"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Mật khẩu"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                        { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Nhập mật khẩu"
                                        className="auth-input"
                                        onChange={handlePasswordChange}
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                    {passwordStrength > 0 && (
                                        <div style={{ marginTop: 8 }}>
                                            <Progress
                                                percent={passwordStrength}
                                                showInfo={false}
                                                strokeColor={getPasswordStrengthColor()}
                                                size="small"
                                            />
                                            <Text
                                                style={{
                                                    fontSize: '12px',
                                                    color: getPasswordStrengthColor(),
                                                    marginTop: 4,
                                                    display: 'block'
                                                }}
                                            >
                                                Độ bảo mật: {getPasswordStrengthText()}
                                            </Text>
                                        </div>
                                    )}
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    label="Nhập lại mật khẩu"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Nhập lại mật khẩu"
                                        className="auth-input"
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="agreeTerms"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản sử dụng!'))
                                        }
                                    ]}
                                >
                                    <Checkbox>
                                        Tôi đồng ý với{' '}
                                        <Link to="/terms" className="auth-link">
                                            Điều khoản sử dụng
                                        </Link>
                                        {' '}và{' '}
                                        <Link to="/privacy" className="auth-link">
                                            Chính sách bảo mật
                                        </Link>
                                    </Checkbox>
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
                                        Đăng ký
                                    </Button>
                                </Form.Item>
                            </Form>

                            <div className="auth-footer">
                                <Text type="secondary">
                                    Đã có tài khoản? {' '}
                                    <Link to="/login" className="auth-link">
                                        Đăng nhập ngay
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

export default RegisterPage;
