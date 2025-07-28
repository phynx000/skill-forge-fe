import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Upload,
    Button,
    Card,
    Row,
    Col,
    Typography,
    Space,
    InputNumber,
    message,
    Breadcrumb,
    Steps
} from 'antd';
import {
    PlusOutlined,
    HomeOutlined,
    BookOutlined,
    SaveOutlined,
    EyeOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Link } from 'react-router-dom';
import './CreateCoursePage.scss';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

interface CourseCategory {
    id: string;
    name: string;
    subCategories: SubCategory[];
}

interface SubCategory {
    id: string;
    name: string;
    parentId: string;
}

interface PreviewData {
    title: string;
    description: string;
    category: string;
    subCategory: string;
    price: number;
    thumbnail?: string;
}

const CreateCoursePage: React.FC = () => {
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [previewData, setPreviewData] = useState<PreviewData | null>(null);

    // Mock data cho categories
    const categories: CourseCategory[] = [
        {
            id: 'programming',
            name: 'Lập trình',
            subCategories: [
                { id: 'web-dev', name: 'Phát triển Web', parentId: 'programming' },
                { id: 'mobile-dev', name: 'Phát triển Mobile', parentId: 'programming' },
                { id: 'data-science', name: 'Khoa học dữ liệu', parentId: 'programming' },
                { id: 'ai-ml', name: 'AI & Machine Learning', parentId: 'programming' },
                { id: 'backend', name: 'Backend Development', parentId: 'programming' },
                { id: 'frontend', name: 'Frontend Development', parentId: 'programming' }
            ]
        },
        {
            id: 'design',
            name: 'Thiết kế',
            subCategories: [
                { id: 'ui-ux', name: 'UI/UX Design', parentId: 'design' },
                { id: 'graphic-design', name: 'Thiết kế đồ họa', parentId: 'design' },
                { id: 'web-design', name: 'Thiết kế Web', parentId: 'design' },
                { id: '3d-animation', name: '3D & Animation', parentId: 'design' },
                { id: 'brand-design', name: 'Thiết kế thương hiệu', parentId: 'design' }
            ]
        },
        {
            id: 'business',
            name: 'Kinh doanh',
            subCategories: [
                { id: 'marketing', name: 'Digital Marketing', parentId: 'business' },
                { id: 'management', name: 'Quản lý', parentId: 'business' },
                { id: 'finance', name: 'Tài chính', parentId: 'business' },
                { id: 'sales', name: 'Bán hàng', parentId: 'business' },
                { id: 'startup', name: 'Khởi nghiệp', parentId: 'business' }
            ]
        },
        {
            id: 'language',
            name: 'Ngôn ngữ',
            subCategories: [
                { id: 'english', name: 'Tiếng Anh', parentId: 'language' },
                { id: 'japanese', name: 'Tiếng Nhật', parentId: 'language' },
                { id: 'korean', name: 'Tiếng Hàn', parentId: 'language' },
                { id: 'chinese', name: 'Tiếng Trung', parentId: 'language' },
                { id: 'french', name: 'Tiếng Pháp', parentId: 'language' }
            ]
        }
    ];

    const getSubCategories = (categoryId: string): SubCategory[] => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.subCategories : [];
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        form.setFieldsValue({ subCategory: undefined });
    };

    const handleThumbnailChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setThumbnailFileList(newFileList);
    };

    const handlePreview = async () => {
        try {
            const values = await form.validateFields();
            setPreviewData({
                ...values,
                thumbnail: thumbnailFileList[0]?.url || thumbnailFileList[0]?.thumbUrl
            });
        } catch {
            message.error('Vui lòng điền đầy đủ thông tin trước khi xem trước');
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            // Simulate API call
            console.log('Course data:', {
                ...values,
                thumbnail: thumbnailFileList[0]
            });

            message.success('Khóa học đã được tạo thành công!');
            form.resetFields();
            setThumbnailFileList([]);
            setCurrentStep(0);
        } catch {
            message.error('Vui lòng kiểm tra lại thông tin');
        }
    };

    const uploadProps: UploadProps = {
        name: 'thumbnail',
        listType: 'picture-card',
        fileList: thumbnailFileList,
        onChange: handleThumbnailChange,
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('Chỉ hỗ trợ file JPG/PNG!');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Kích thước file phải nhỏ hơn 2MB!');
                return false;
            }
            return false; // Prevent auto upload
        },
        maxCount: 1
    };

    const steps = [
        {
            title: 'Thông tin cơ bản',
            content: 'Nhập thông tin cơ bản về khóa học'
        },
        {
            title: 'Chi tiết khóa học',
            content: 'Thêm mô tả và hình ảnh'
        },
        {
            title: 'Xem trước & Hoàn thành',
            content: 'Kiểm tra và hoàn thành tạo khóa học'
        }
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <>
                        <Row gutter={[24, 16]}>
                            <Col xs={24}>
                                <Form.Item
                                    label="Tiêu đề khóa học"
                                    name="title"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tiêu đề khóa học!' },
                                        { min: 10, message: 'Tiêu đề phải có ít nhất 10 ký tự!' },
                                        { max: 100, message: 'Tiêu đề không được vượt quá 100 ký tự!' }
                                    ]}
                                >
                                    <Input
                                        placeholder="Nhập tiêu đề khóa học..."
                                        showCount
                                        maxLength={100}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[24, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Danh mục chính"
                                    name="category"
                                    rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                                >
                                    <Select
                                        placeholder="Chọn danh mục chính"
                                        size="large"
                                        onChange={handleCategoryChange}
                                    >
                                        {categories.map(category => (
                                            <Option key={category.id} value={category.id}>
                                                {category.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Danh mục con"
                                    name="subCategory"
                                    rules={[{ required: true, message: 'Vui lòng chọn danh mục con!' }]}
                                >
                                    <Select
                                        placeholder="Chọn danh mục con"
                                        size="large"
                                        disabled={!selectedCategory}
                                    >
                                        {getSubCategories(selectedCategory).map(subCategory => (
                                            <Option key={subCategory.id} value={subCategory.id}>
                                                {subCategory.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[24, 16]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Giá khóa học (VNĐ)"
                                    name="price"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập giá khóa học!' },
                                        {
                                            validator: (_, value) => {
                                                if (value && value < 0) {
                                                    return Promise.reject(new Error('Giá không được âm!'));
                                                }
                                                return Promise.resolve();
                                            }
                                        }
                                    ]}
                                >
                                    <InputNumber
                                        placeholder="Nhập giá khóa học"
                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        style={{ width: '100%' }}
                                        size="large"
                                        min={0}
                                        step={10000}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                );

            case 1:
                return (
                    <>
                        <Row gutter={[24, 16]}>
                            <Col xs={24}>
                                <Form.Item
                                    label="Mô tả khóa học"
                                    name="description"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mô tả khóa học!' },
                                        { min: 50, message: 'Mô tả phải có ít nhất 50 ký tự!' },
                                        { max: 1000, message: 'Mô tả không được vượt quá 1000 ký tự!' }
                                    ]}
                                >
                                    <TextArea
                                        rows={6}
                                        placeholder="Nhập mô tả chi tiết về khóa học, nội dung học, đối tượng phù hợp..."
                                        showCount
                                        maxLength={1000}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[24, 16]}>
                            <Col xs={24}>
                                <Form.Item
                                    label="Hình ảnh khóa học"
                                    name="thumbnail"
                                    rules={[{ message: 'Vui lòng upload hình ảnh khóa học!' }]}
                                >
                                    <Upload {...uploadProps}>
                                        {thumbnailFileList.length >= 1 ? null : (
                                            <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </div>
                                        )}
                                    </Upload>
                                    <Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
                                        Hỗ trợ: JPG, PNG. Kích thước tối đa: 2MB. Tỷ lệ khuyến nghị: 16:9
                                    </Text>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                );

            case 2:
                return (
                    <div className="preview-content">
                        <Card title="Xem trước khóa học" className="preview-card">
                            {previewData ? (
                                <div className="course-preview">
                                    <Row gutter={[24, 16]}>
                                        <Col xs={24} md={8}>
                                            {previewData.thumbnail ? (
                                                <img
                                                    src={previewData.thumbnail}
                                                    alt="Course thumbnail"
                                                    style={{ width: '100%', borderRadius: 8 }}
                                                />
                                            ) : (
                                                <div className="no-image">Chưa có hình ảnh</div>
                                            )}
                                        </Col>
                                        <Col xs={24} md={16}>
                                            <Title level={4}>{previewData.title}</Title>
                                            <Text type="secondary">{previewData.description}</Text>
                                            <br /><br />
                                            <Space direction="vertical">
                                                <Text><strong>Danh mục:</strong> {categories.find(c => c.id === previewData.category)?.name}</Text>
                                                <Text><strong>Danh mục con:</strong> {
                                                    getSubCategories(previewData.category)
                                                        .find(sc => sc.id === previewData.subCategory)?.name
                                                }</Text>
                                                <Text><strong>Giá:</strong> {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(previewData.price)}</Text>
                                            </Space>
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                <Button type="primary" onClick={handlePreview} icon={<EyeOutlined />}>
                                    Xem trước khóa học
                                </Button>
                            )}
                        </Card>
                    </div>
                );

            default:
                return null;
        }
    };

    const next = async () => {
        try {
            if (currentStep === 0) {
                await form.validateFields(['title', 'category', 'subCategory', 'price']);
            } else if (currentStep === 1) {
                await form.validateFields(['description', 'thumbnail']);
                if (thumbnailFileList.length === 0) {
                    message.error('Vui lòng upload hình ảnh khóa học!');
                    return;
                }
            }
            setCurrentStep(currentStep + 1);
        } catch {
            message.error('Vui lòng điền đầy đủ thông tin trước khi tiếp tục');
        }
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="create-course-page">
            {/* Breadcrumb */}
            <div className="breadcrumb-container">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <HomeOutlined />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/profile/instructor/1">
                            <BookOutlined />
                            <span>Instructor Dashboard</span>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Tạo khóa học mới</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {/* Header */}
            <div className="page-header">
                <Title level={2}>Tạo khóa học mới</Title>
                <Text type="secondary">
                    Tạo khóa học chất lượng cao để chia sẻ kiến thức và kỹ năng của bạn
                </Text>
            </div>

            {/* Steps */}
            <div className="steps-container">
                <Steps current={currentStep}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} description={item.content} />
                    ))}
                </Steps>
            </div>

            {/* Content */}
            <div className="form-container">
                <Card className="form-card">
                    <Form
                        form={form}
                        layout="vertical"
                        name="create-course"
                        scrollToFirstError
                    >
                        {renderStepContent()}
                    </Form>
                </Card>
            </div>

            {/* Actions */}
            <div className="actions-container">
                <Space size="middle">
                    {currentStep > 0 && (
                        <Button size="large" onClick={prev}>
                            Quay lại
                        </Button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <Button type="primary" size="large" onClick={next}>
                            Tiếp tục
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleSubmit}
                            icon={<SaveOutlined />}
                        >
                            Tạo khóa học
                        </Button>
                    )}
                </Space>
            </div>
        </div>
    );
};

export default CreateCoursePage;
