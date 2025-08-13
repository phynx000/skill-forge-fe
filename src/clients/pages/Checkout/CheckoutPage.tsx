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
    Breadcrumb,
    Spin,
    Alert
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
import { useDetailCourse } from '../../../hooks/useDetailCourse';
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
    const courseId = courseIdFromUrl ? Number(courseIdFromUrl) : 0;

    // Fetch course detail từ API nếu có courseId hợp lệ
    const { courseDetail, loading: courseLoading, error: courseError } = useDetailCourse(courseId);

    // Extract course data
    const course = courseDetail?.data;


    useEffect(() => {
        if (courseIdFromUrl) {
            console.log('Course ID from URL:', courseIdFromUrl);
        }
    }, [courseIdFromUrl]);

    // Calculate discount percentage
    const calculateDiscountPercent = () => {
        if (!course || course.originalPrice === 0) return 0;
        return Math.round(((course.originalPrice - course.discountPrice) / course.originalPrice) * 100);
    };

    const handleSubmit = async (values: CheckoutFormData) => {
        if (!course) {
            message.error('Không tìm thấy thông tin khóa học');
            return;
        }

        setLoading(true);

        try {
            // Prepare checkout data
            const checkoutData = {
                ...values,
                courseId: courseId,
                courseName: course.title,
                totalAmount: course.discountPrice || course.originalPrice,
                instructor: course.instructor.name
            };

            console.log('Checkout data:', checkoutData);

            // Mock API delay - replace với actual API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            message.success(`Mua khóa học "${course.title}" thành công! Bạn sẽ nhận được email xác nhận trong vài phút.`);
            form.resetFields();

            // TODO: Redirect to success page or course learning page
            // navigate(`/course/${courseId}/learn`);

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

    // Handle loading state
    if (courseLoading) {
        return (
            <div className="checkout-page">
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <Spin size="large" />
                    <div style={{ marginTop: 16 }}>Đang tải thông tin khóa học...</div>
                </div>
            </div>
        );
    }

    // Handle error state
    if (courseError || !course) {
        return (
            <div className="checkout-page">
                <div style={{ padding: '50px 0' }}>
                    <Alert
                        message="Lỗi"
                        description={courseError || "Không tìm thấy thông tin khóa học"}
                        type="error"
                        showIcon
                        action={
                            <Button type="primary" onClick={() => window.history.back()}>
                                Quay lại
                            </Button>
                        }
                    />
                </div>
            </div>
        );
    }

    const paymentOptions = [
        {
            value: 'bank_transfer',
            label: 'Chuyển khoản ngân hàng',
            icon: <BankOutlined />,
            description: 'Chuyển khoản qua tài khoản ngân hàng'
        },
        {
            value: 'vnpay',
            label: 'VNPay',
            icon: <WalletOutlined />,
            description: 'Thanh toán qua VNPay '
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
                        <Link to={`/course-detail/${courseId}`}>
                            {course.title.length > 50 ? `${course.title.substring(0, 50)}...` : course.title}
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
                                    <p>Bạn sẽ được chuyển hướng đến cổng thanh toán VNPay.</p>
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
                                    src={course.thumbnailUrl || 'https://via.placeholder.com/300x180.png?text=Course'}
                                    alt={course.title}
                                    preview={false}
                                />
                            </div>
                            <div className="course-details">
                                <Title level={5} className="course-title">
                                    {course.title}
                                </Title>
                                <div className="course-meta">
                                    <Text type="secondary">Giảng viên: {course.instructor.name}</Text>
                                    <br />
                                    <Space size={[0, 8]} wrap>
                                        <Tag color="blue">{course.duration}</Tag>
                                        <Tag color="green">{course.lessonCount} bài học</Tag>
                                    </Space>
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div className="price-breakdown">
                            <div className="price-row">
                                <Text>Giá gốc:</Text>
                                <Text delete type="secondary">
                                    {formatPrice(course.originalPrice)}
                                </Text>
                            </div>
                            {course.discountPrice < course.originalPrice && (
                                <div className="price-row">
                                    <Text>Giảm giá ({calculateDiscountPercent()}%):</Text>
                                    <Text type="success">
                                        -{formatPrice(course.originalPrice - course.discountPrice)}
                                    </Text>
                                </div>
                            )}
                            <Divider style={{ margin: '12px 0' }} />
                            <div className="price-row total">
                                <Title level={4}>Tổng cộng:</Title>
                                <Title level={4} type="danger">
                                    {formatPrice(course.discountPrice || course.originalPrice)}
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
                            {loading ? 'Đang xử lý...' :
                                (course.originalPrice === 0 || course.discountPrice === 0) ? 'Đăng ký miễn phí' : 'Mua ngay'}
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
