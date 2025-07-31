import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Radio,
    Button,
    Typography,
    Divider,
    Image,
    message,
    Space,
    Tag,
    Breadcrumb
} from 'antd';
import {
    CreditCardOutlined,
    BankOutlined,
    ShoppingCartOutlined,
    HomeOutlined,
    BookOutlined,
    WalletOutlined
} from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import './CheckoutPage.scss';

const { Title, Text, Paragraph } = Typography;

interface CheckoutFormData {
    fullName: string;
    email: string;
    phone: string;
    note?: string;
    paymentMethod: 'bank_transfer' | 'vnpay' | 'credit_card';
}

const CheckoutPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('vnpay');

    const [searchParams] = useSearchParams();
    const courseIdFromUrl = searchParams.get('courseId');


    useEffect(() => {
        if (courseIdFromUrl) {
            // Set course data based on courseId from URL
            console.log('Course ID from URL:', courseIdFromUrl);
        }
    }, [courseIdFromUrl]);
    // Mock data cho khóa học
    const courseData = {
        id: 1,
        title: 'React TypeScript Masterclass - Từ Cơ Bản Đến Nâng Cao',
        thumbnail: 'https://via.placeholder.com/300x180.png?text=React+Course',
        originalPrice: 1500000,
        discountPrice: 999000,
        discountPercent: 34,
        instructor: 'Nguyễn Văn A',
        duration: '40 giờ',
        lessons: 120
    };

    const handleSubmit = async (values: CheckoutFormData) => {
        setLoading(true);

        try {
            // Simulate API call
            console.log('Checkout data:', values);

            // Mock API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            message.success('Mua khóa học thành công! Bạn sẽ nhận được email xác nhận trong vài phút.');
            form.resetFields();
        } catch {
            message.error('Có lỗi xảy ra khi mua khóa học. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const paymentOptions = [
        {
            value: 'bank_transfer',
            label: 'Chuyển khoản ngân hàng',
            icon: <BankOutlined />,
            description: 'Chuyển khoản qua tài khoản ngân hàng'
        },
        {
            value: 'vnpay',
            label: 'VNPay (MoMo, Ví điện tử)',
            icon: <WalletOutlined />,
            description: 'Thanh toán qua VNPay - Hỗ trợ MoMo, ZaloPay, ShopeePay'
        },
        {
            value: 'credit_card',
            label: 'Thẻ tín dụng/ghi nợ',
            icon: <CreditCardOutlined />,
            description: 'Visa, Mastercard, JCB'
        }
    ];

    return (
        <div className="checkout-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <HomeOutlined />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/list-course">
                            <BookOutlined />
                            <span>Khóa học</span>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <ShoppingCartOutlined />
                        <span>Thanh toán</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <Title level={2}>
                    <ShoppingCartOutlined /> Thanh toán khóa học
                </Title>
                <Paragraph type="secondary">
                    Hoàn tất thông tin để mua khóa học
                </Paragraph>
            </div>

            <Row gutter={[32, 32]} className="checkout-content">
                {/* Left Column - Customer Info & Payment Method */}
                <Col xs={24} lg={14} xl={15}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                            paymentMethod: 'vnpay'
                        }}
                    >
                        {/* Customer Information */}


                        {/* Payment Method */}
                        <Card
                            title="Phương thức thanh toán"
                            className="form-section"
                            bordered={false}
                        >
                            <Form.Item
                                name="paymentMethod"
                                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                            >
                                <Radio.Group
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="payment-methods"
                                >
                                    {paymentOptions.map((option) => (
                                        <Radio.Button
                                            key={option.value}
                                            value={option.value}
                                            className="payment-option"
                                        >
                                            <div className="payment-content">
                                                <div className="payment-header">
                                                    <Space>
                                                        {option.icon}
                                                        <span className="payment-label">{option.label}</span>
                                                    </Space>
                                                </div>
                                                <Text type="secondary" className="payment-description">
                                                    {option.description}
                                                </Text>
                                            </div>
                                        </Radio.Button>
                                    ))}
                                </Radio.Group>
                            </Form.Item>

                            {/* Payment Details based on selected method */}
                            {paymentMethod === 'bank_transfer' && (
                                <Card size="small" className="payment-details">
                                    <Title level={5}>Thông tin chuyển khoản:</Title>
                                    <div className="bank-info">
                                        <p><strong>Ngân hàng:</strong> Vietcombank</p>
                                        <p><strong>Số tài khoản:</strong> 1234567890</p>
                                        <p><strong>Chủ tài khoản:</strong> SKILLFORGE EDUCATION</p>
                                        <p><strong>Nội dung:</strong> THANHTOAN [Email của bạn]</p>
                                    </div>
                                </Card>
                            )}

                            {paymentMethod === 'vnpay' && (
                                <Card size="small" className="payment-details">
                                    <Title level={5}>Thanh toán VNPay:</Title>
                                    <p>Bạn sẽ được chuyển hướng đến cổng thanh toán VNPay để chọn phương thức: MoMo, ZaloPay, ShopeePay, thẻ ngân hàng.</p>
                                </Card>
                            )}

                            {paymentMethod === 'credit_card' && (
                                <Card size="small" className="payment-details">
                                    <Title level={5}>Thanh toán thẻ:</Title>
                                    <p>Hệ thống sẽ chuyển hướng đến cổng thanh toán an toàn để xử lý thẻ của bạn.</p>
                                </Card>
                            )}
                        </Card>
                    </Form>
                </Col>

                {/* Right Column - Order Summary */}
                <Col xs={24} lg={10} xl={9}>
                    <Card title="Tóm tắt đơn mua" className="order-summary" bordered={false}>
                        <div className="course-item">
                            <div className="course-image">
                                <Image
                                    width={80}
                                    height={60}
                                    src={courseData.thumbnail}
                                    alt={courseData.title}
                                    preview={false}
                                />
                            </div>
                            <div className="course-details">
                                <Title level={5} className="course-title">
                                    {courseData.title}
                                </Title>
                                <div className="course-meta">
                                    <Text type="secondary">Giảng viên: {courseData.instructor}</Text>
                                    <br />
                                    <Space size={[0, 8]} wrap>
                                        <Tag color="blue">{courseData.duration}</Tag>
                                        <Tag color="green">{courseData.lessons} bài học</Tag>
                                    </Space>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div className="price-breakdown">
                            <div className="price-row">
                                <Text>Giá gốc:</Text>
                                <Text delete type="secondary">
                                    {formatPrice(courseData.originalPrice)}
                                </Text>
                            </div>
                            <div className="price-row">
                                <Text>Giảm giá ({courseData.discountPercent}%):</Text>
                                <Text type="success">
                                    -{formatPrice(courseData.originalPrice - courseData.discountPrice)}
                                </Text>
                            </div>
                            <Divider style={{ margin: '12px 0' }} />
                            <div className="price-row total">
                                <Title level={4}>Tổng cộng:</Title>
                                <Title level={4} type="danger">
                                    {formatPrice(courseData.discountPrice)}
                                </Title>
                            </div>
                        </div>

                        <Divider />

                        <Button
                            type="primary"
                            size="large"
                            block
                            loading={loading}
                            onClick={() => form.submit()}
                            className="checkout-button"
                        >
                            {loading ? 'Đang xử lý...' : 'Mua ngay'}
                        </Button>

                        <div className="security-note">
                            <Text type="secondary" className="security-text">
                                🔒 Thông tin của bạn được bảo mật tuyệt đối
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CheckoutPage;
