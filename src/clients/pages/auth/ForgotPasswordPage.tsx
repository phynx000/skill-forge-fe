import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Typography,
    Card,
    Row,
    Col,
    message,
    Result
} from 'antd';
import {
    MailOutlined,
    ArrowLeftOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';

const { Title, Text, Paragraph } = Typography;

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPasswordPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (values: ForgotPasswordFormData) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Forgot password for:', values.email);
            setSubmittedEmail(values.email);
            setEmailSent(true);
            message.success('Email đặt lại mật khẩu đã được gửi!');
        } catch {
            message.error('Có lỗi xảy ra. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const handleResendEmail = async () => {
        setLoading(true);
        try {
            // Simulate resend API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            message.success('Email đã được gửi lại!');
        } catch {
            message.error('Có lỗi xảy ra. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div className="auth-page">
                <div className="auth-container">
                    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                        <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                            <Card className="auth-card">
                                <Result
                                    status="success"
                                    title="Email đã được gửi!"
                                    subTitle={
                                        <div>
                                            <Paragraph>
                                                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email:
                                            </Paragraph>
                                            <Text strong>{submittedEmail}</Text>
                                            <Paragraph style={{ marginTop: 16 }}>
                                                Vui lòng kiểm tra hộp thư (bao gồm cả thư mục spam) và làm theo hướng dẫn để đặt lại mật khẩu.
                                            </Paragraph>
                                        </div>
                                    }
                                    extra={[
                                        <Button key="resend" loading={loading} onClick={handleResendEmail}>
                                            Gửi lại email
                                        </Button>,
                                        <Button key="back" type="primary" onClick={() => navigate('/login')}>
                                            Quay lại đăng nhập
                                        </Button>,
                                    ]}
                                />
                            </Card>
                        </Col>
                    </Row>
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
                <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                        <Card className="auth-card">
                            <div className="auth-header">
                                <Button
                                    type="text"
                                    icon={<ArrowLeftOutlined />}
                                    className="back-button"
                                    onClick={() => navigate('/login')}
                                >
                                    Quay lại
                                </Button>

                                <Title level={2} className="auth-title" style={{ marginTop: 16 }}>
                                    Quên mật khẩu
                                </Title>
                                <Text type="secondary" className="auth-subtitle">
                                    Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
                                </Text>
                            </div>

                            <Form
                                form={form}
                                name="forgotPassword"
                                onFinish={handleForgotPassword}
                                autoComplete="off"
                                layout="vertical"
                                size="large"
                                style={{ marginTop: 24 }}
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
                                        prefix={<MailOutlined />}
                                        placeholder="Nhập email đã đăng ký"
                                        className="auth-input"
                                    />
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
                                        Gửi email đặt lại
                                    </Button>
                                </Form.Item>
                            </Form>

                            <div className="auth-footer">
                                <Text type="secondary">
                                    Nhớ lại mật khẩu? {' '}
                                    <Link to="/login" className="auth-link">
                                        Đăng nhập ngay
                                    </Link>
                                </Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
