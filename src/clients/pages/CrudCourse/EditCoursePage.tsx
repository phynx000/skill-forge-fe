import React, { useState } from 'react';
import {
    Card,
    Typography,
    Row,
    Col,
    Button,
    Space,
    Collapse,
    List,
    Modal,
    Form,
    Input,
    Select,
    Upload,
    Switch,
    InputNumber,
    message,
    Popconfirm,
    Breadcrumb,
    Divider,
    Tag
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    DragOutlined,
    PlayCircleOutlined,
    FileTextOutlined,
    UploadOutlined,
    SaveOutlined,
    HomeOutlined,
    BookOutlined,
    ClockCircleOutlined,
    EyeOutlined
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Link } from 'react-router-dom';
import './EditCoursePage.scss';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;

interface Lesson {
    id: string;
    title: string;
    type: 'video' | 'document' | 'quiz';
    duration?: number; // minutes
    videoUrl?: string;
    documentUrl?: string;
    content?: string;
    isPreview: boolean;
    order: number;
}

interface Section {
    id: string;
    title: string;
    description?: string;
    lessons: Lesson[];
    order: number;
}

interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    category: string;
    subCategory: string;
    sections: Section[];
}

const EditCoursePage: React.FC = () => {
    const [sectionForm] = Form.useForm();
    const [lessonForm] = Form.useForm();

    // Mock course data
    const [course, setCourse] = useState<Course>({
        id: '1',
        title: 'React TypeScript Masterclass',
        description: 'Học React.js từ A-Z với TypeScript, Hooks, Context API, Redux Toolkit và các dự án thực tế',
        thumbnail: '/api/placeholder/400/225',
        price: 899000,
        category: 'programming',
        subCategory: 'frontend',
        sections: [
            {
                id: 'section-1',
                title: 'Giới thiệu React TypeScript',
                description: 'Những kiến thức cơ bản về React và TypeScript',
                order: 1,
                lessons: [
                    {
                        id: 'lesson-1',
                        title: 'Tổng quan về React và TypeScript',
                        type: 'video',
                        duration: 15,
                        videoUrl: 'https://vz-11106c72-014.b-cdn.net/16c15a77-9f54-4520-9a4a-af3c6e353784/playlist.m3u8',
                        isPreview: true,
                        order: 1
                    },
                    {
                        id: 'lesson-2',
                        title: 'Cài đặt môi trường phát triển',
                        type: 'video',
                        duration: 12,
                        videoUrl: 'https://vz-11106c72-014.b-cdn.net/a2e84cf4-7890-4f6e-9b2c-3d4e5f678901/playlist.m3u8',
                        isPreview: false,
                        order: 2
                    },
                    {
                        id: 'lesson-3',
                        title: 'Bài tập thực hành',
                        type: 'document',
                        documentUrl: 'https://example.com/exercise1.pdf',
                        isPreview: false,
                        order: 3
                    }
                ]
            },
            {
                id: 'section-2',
                title: 'Hooks và State Management',
                description: 'Tìm hiểu về React Hooks và quản lý state',
                order: 2,
                lessons: [
                    {
                        id: 'lesson-4',
                        title: 'useState và useEffect',
                        type: 'video',
                        duration: 20,
                        videoUrl: 'https://vz-11106c72-014.b-cdn.net/b3f95de8-1234-5678-9abc-def012345678/playlist.m3u8',
                        isPreview: false,
                        order: 1
                    },
                    {
                        id: 'lesson-5',
                        title: 'Custom Hooks',
                        type: 'video',
                        duration: 25,
                        videoUrl: 'https://vz-11106c72-014.b-cdn.net/c4a06ef9-2345-6789-bcde-f01234567890/playlist.m3u8',
                        isPreview: false,
                        order: 2
                    }
                ]
            }
        ]
    });

    const [isAddSectionModalVisible, setIsAddSectionModalVisible] = useState(false);
    const [isEditSectionModalVisible, setIsEditSectionModalVisible] = useState(false);
    const [isAddLessonModalVisible, setIsAddLessonModalVisible] = useState(false);
    const [isEditLessonModalVisible, setIsEditLessonModalVisible] = useState(false);

    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [currentSectionId, setCurrentSectionId] = useState<string>('');

    const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
    const [documentFileList, setDocumentFileList] = useState<UploadFile[]>([]);

    // Add new section
    const handleAddSection = async () => {
        try {
            const values = await sectionForm.validateFields();
            const newSection: Section = {
                id: `section-${Date.now()}`,
                title: values.title,
                description: values.description,
                lessons: [],
                order: course.sections.length + 1
            };

            setCourse({
                ...course,
                sections: [...course.sections, newSection]
            });

            setIsAddSectionModalVisible(false);
            sectionForm.resetFields();
            message.success('Đã thêm section mới!');
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    // Edit section
    const handleEditSection = async () => {
        if (!currentSection) return;

        try {
            const values = await sectionForm.validateFields();
            const updatedSections = course.sections.map(section =>
                section.id === currentSection.id
                    ? { ...section, title: values.title, description: values.description }
                    : section
            );

            setCourse({ ...course, sections: updatedSections });
            setIsEditSectionModalVisible(false);
            setCurrentSection(null);
            sectionForm.resetFields();
            message.success('Đã cập nhật section!');
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    // Delete section
    const handleDeleteSection = (sectionId: string) => {
        const updatedSections = course.sections.filter(section => section.id !== sectionId);
        setCourse({ ...course, sections: updatedSections });
        message.success('Đã xóa section!');
    };

    // Add new lesson
    const handleAddLesson = async () => {
        try {
            const values = await lessonForm.validateFields();

            // Validate file uploads
            if (values.type === 'video' && videoFileList.length === 0) {
                message.error('Vui lòng upload file video!');
                return;
            }
            if (values.type === 'document' && documentFileList.length === 0) {
                message.error('Vui lòng upload file tài liệu!');
                return;
            }

            const newLesson: Lesson = {
                id: `lesson-${Date.now()}`,
                title: values.title,
                type: values.type,
                duration: values.duration,
                content: values.content,
                isPreview: values.isPreview || false,
                order: (course.sections.find(s => s.id === currentSectionId)?.lessons.length || 0) + 1
            };

            // Handle file uploads based on lesson type
            if (values.type === 'video' && videoFileList.length > 0) {
                newLesson.videoUrl = videoFileList[0].url || videoFileList[0].response?.url || `uploaded/${videoFileList[0].name}`;
            } else if (values.type === 'document' && documentFileList.length > 0) {
                newLesson.documentUrl = documentFileList[0].url || documentFileList[0].response?.url || `uploaded/${documentFileList[0].name}`;
            }

            const updatedSections = course.sections.map(section =>
                section.id === currentSectionId
                    ? { ...section, lessons: [...section.lessons, newLesson] }
                    : section
            );

            setCourse({ ...course, sections: updatedSections });
            setIsAddLessonModalVisible(false);
            setCurrentSectionId('');
            lessonForm.resetFields();
            setVideoFileList([]);
            setDocumentFileList([]);
            message.success('Đã thêm lesson mới!');
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    // Edit lesson
    const handleEditLesson = async () => {
        if (!currentLesson || !currentSectionId) return;

        try {
            const values = await lessonForm.validateFields();
            const updatedLesson = { ...currentLesson, ...values };

            // Handle file uploads based on lesson type
            if (values.type === 'video' && videoFileList.length > 0) {
                updatedLesson.videoUrl = videoFileList[0].url || videoFileList[0].response?.url || `uploaded/${videoFileList[0].name}`;
            } else if (values.type === 'document' && documentFileList.length > 0) {
                updatedLesson.documentUrl = documentFileList[0].url || documentFileList[0].response?.url || `uploaded/${documentFileList[0].name}`;
            }

            const updatedSections = course.sections.map(section =>
                section.id === currentSectionId
                    ? {
                        ...section,
                        lessons: section.lessons.map(lesson =>
                            lesson.id === currentLesson.id
                                ? updatedLesson
                                : lesson
                        )
                    }
                    : section
            );

            setCourse({ ...course, sections: updatedSections });
            setIsEditLessonModalVisible(false);
            setCurrentLesson(null);
            setCurrentSectionId('');
            lessonForm.resetFields();
            setVideoFileList([]);
            setDocumentFileList([]);
            message.success('Đã cập nhật lesson!');
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    // Delete lesson
    const handleDeleteLesson = (sectionId: string, lessonId: string) => {
        const updatedSections = course.sections.map(section =>
            section.id === sectionId
                ? { ...section, lessons: section.lessons.filter(lesson => lesson.id !== lessonId) }
                : section
        );
        setCourse({ ...course, sections: updatedSections });
        message.success('Đã xóa lesson!');
    };

    // Upload props for different file types
    const videoUploadProps: UploadProps = {
        name: 'video',
        listType: 'text',
        fileList: videoFileList,
        onChange: ({ fileList }) => setVideoFileList(fileList),
        beforeUpload: (file) => {
            const isVideo = file.type.startsWith('video/') ||
                ['.mp4', '.avi', '.mov', '.wmv', '.webm', '.mkv'].some(ext =>
                    file.name.toLowerCase().endsWith(ext));
            if (!isVideo) {
                message.error('Chỉ có thể upload file video!');
                return false;
            }
            const isLt500M = file.size / 1024 / 1024 < 500;
            if (!isLt500M) {
                message.error('File video phải nhỏ hơn 500MB!');
                return false;
            }
            message.success(`Đã chọn video: ${file.name} (${formatFileSize(file.size)})`);
            return false; // Prevent auto upload
        },
        accept: '.mp4,.avi,.mov,.wmv,.webm,.mkv,video/*',
        maxCount: 1
    };

    const documentUploadProps: UploadProps = {
        name: 'document',
        listType: 'text',
        fileList: documentFileList,
        onChange: ({ fileList }) => setDocumentFileList(fileList),
        beforeUpload: (file) => {
            const isDocument = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.txt', '.rtf'].some(ext =>
                file.name.toLowerCase().endsWith(ext));
            if (!isDocument) {
                message.error('Chỉ có thể upload file PDF, Word, PowerPoint hoặc Text!');
                return false;
            }
            const isLt50M = file.size / 1024 / 1024 < 50;
            if (!isLt50M) {
                message.error('File tài liệu phải nhỏ hơn 50MB!');
                return false;
            }
            message.success(`Đã chọn tài liệu: ${file.name} (${formatFileSize(file.size)})`);
            return false; // Prevent auto upload
        },
        accept: '.pdf,.doc,.docx,.ppt,.pptx,.txt,.rtf',
        maxCount: 1
    };

    const getLessonIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <PlayCircleOutlined style={{ color: '#1890ff' }} />;
            case 'document':
                return <FileTextOutlined style={{ color: '#52c41a' }} />;
            case 'quiz':
                return <FileTextOutlined style={{ color: '#faad14' }} />;
            default:
                return <FileTextOutlined />;
        }
    };

    const getLessonTypeLabel = (type: string) => {
        switch (type) {
            case 'video':
                return 'Video';
            case 'document':
                return 'Tài liệu';
            case 'quiz':
                return 'Bài tập';
            default:
                return 'Khác';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const renderLessonItem = (lesson: Lesson, sectionId: string) => (
        <List.Item
            key={lesson.id}
            className="lesson-item"
            actions={[
                <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => {
                        setCurrentLesson(lesson);
                        setCurrentSectionId(sectionId);
                        lessonForm.setFieldsValue(lesson);
                        setIsEditLessonModalVisible(true);
                    }}
                >
                    Sửa
                </Button>,
                <Popconfirm
                    title="Bạn có chắc muốn xóa lesson này?"
                    onConfirm={() => handleDeleteLesson(sectionId, lesson.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <Button type="text" size="small" danger icon={<DeleteOutlined />}>
                        Xóa
                    </Button>
                </Popconfirm>
            ]}
        >
            <List.Item.Meta
                avatar={getLessonIcon(lesson.type)}
                title={
                    <Space>
                        <span>{lesson.title}</span>
                        {lesson.isPreview && <Tag color="blue">Preview</Tag>}
                        <Tag color="default">{getLessonTypeLabel(lesson.type)}</Tag>
                    </Space>
                }
                description={
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Space>
                            {lesson.duration && (
                                <Text type="secondary">
                                    <ClockCircleOutlined /> {lesson.duration} phút
                                </Text>
                            )}
                        </Space>
                        {lesson.videoUrl && (
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                📹 Video: {lesson.videoUrl.split('/').pop()}
                            </Text>
                        )}
                        {lesson.documentUrl && (
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                📄 Tài liệu: {lesson.documentUrl.split('/').pop()}
                            </Text>
                        )}
                        {lesson.content && lesson.type === 'quiz' && (
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                📝 {lesson.content.length > 50 ? lesson.content.substring(0, 50) + '...' : lesson.content}
                            </Text>
                        )}
                    </Space>
                }
            />
            <Button type="text" icon={<DragOutlined />} size="small" />
        </List.Item>
    );

    return (
        <div className="edit-course-page">
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
                    <Breadcrumb.Item>Chỉnh sửa khóa học</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {/* Header */}
            <div className="page-header">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={2}>{course.title}</Title>
                        <Text type="secondary">Chỉnh sửa nội dung và cấu trúc khóa học</Text>
                    </Col>
                    <Col>
                        <Space>
                            <Button icon={<EyeOutlined />}>Xem trước</Button>
                            <Button type="primary" icon={<SaveOutlined />}>
                                Lưu thay đổi
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </div>

            {/* Content */}
            <div className="page-content">
                <Row gutter={[24, 24]}>
                    {/* Course Curriculum */}
                    <Col xs={24}>
                        <Card
                            title="Nội dung khóa học"
                            extra={
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsAddSectionModalVisible(true)}
                                >
                                    Thêm Section
                                </Button>
                            }
                            className="curriculum-card"
                        >
                            {course.sections.length === 0 ? (
                                <div className="empty-curriculum">
                                    <Text type="secondary">
                                        Chưa có section nào. Hãy thêm section đầu tiên!
                                    </Text>
                                </div>
                            ) : (
                                <Collapse className="sections-collapse">
                                    {course.sections.map((section) => (
                                        <Panel
                                            key={section.id}
                                            header={
                                                <div className="section-header">
                                                    <Space>
                                                        <DragOutlined />
                                                        <span className="section-title">{section.title}</span>
                                                        <Text type="secondary">({section.lessons.length} lessons)</Text>
                                                    </Space>
                                                </div>
                                            }
                                            extra={
                                                <Space size="small" onClick={(e) => e.stopPropagation()}>
                                                    <Button
                                                        type="text"
                                                        size="small"
                                                        icon={<PlusOutlined />}
                                                        onClick={() => {
                                                            setCurrentSectionId(section.id);
                                                            setIsAddLessonModalVisible(true);
                                                        }}
                                                    >
                                                        Thêm Lesson
                                                    </Button>
                                                    <Button
                                                        type="text"
                                                        size="small"
                                                        icon={<EditOutlined />}
                                                        onClick={() => {
                                                            setCurrentSection(section);
                                                            sectionForm.setFieldsValue(section);
                                                            setIsEditSectionModalVisible(true);
                                                        }}
                                                    />
                                                    <Popconfirm
                                                        title="Bạn có chắc muốn xóa section này?"
                                                        onConfirm={() => handleDeleteSection(section.id)}
                                                        okText="Xóa"
                                                        cancelText="Hủy"
                                                    >
                                                        <Button
                                                            type="text"
                                                            size="small"
                                                            danger
                                                            icon={<DeleteOutlined />}
                                                        />
                                                    </Popconfirm>
                                                </Space>
                                            }
                                        >
                                            {section.description && (
                                                <Text type="secondary" className="section-description">
                                                    {section.description}
                                                </Text>
                                            )}

                                            <Divider />

                                            {section.lessons.length === 0 ? (
                                                <div className="empty-lessons">
                                                    <Text type="secondary">
                                                        Chưa có lesson nào trong section này.
                                                    </Text>
                                                    <Button
                                                        type="link"
                                                        icon={<PlusOutlined />}
                                                        onClick={() => {
                                                            setCurrentSectionId(section.id);
                                                            setIsAddLessonModalVisible(true);
                                                        }}
                                                    >
                                                        Thêm lesson đầu tiên
                                                    </Button>
                                                </div>
                                            ) : (
                                                <List
                                                    dataSource={section.lessons}
                                                    renderItem={(lesson) => renderLessonItem(lesson, section.id)}
                                                    className="lessons-list"
                                                />
                                            )}
                                        </Panel>
                                    ))}
                                </Collapse>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Add Section Modal */}
            <Modal
                title="Thêm Section mới"
                open={isAddSectionModalVisible}
                onOk={handleAddSection}
                onCancel={() => {
                    setIsAddSectionModalVisible(false);
                    sectionForm.resetFields();
                }}
                okText="Thêm"
                cancelText="Hủy"
                width={600}
            >
                <Form form={sectionForm} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Tiêu đề Section"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input placeholder="Nhập tiêu đề section..." />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả (không bắt buộc)"
                    >
                        <TextArea
                            rows={3}
                            placeholder="Nhập mô tả ngắn về section..."
                            showCount
                            maxLength={200}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Section Modal */}
            <Modal
                title="Chỉnh sửa Section"
                open={isEditSectionModalVisible}
                onOk={handleEditSection}
                onCancel={() => {
                    setIsEditSectionModalVisible(false);
                    setCurrentSection(null);
                    sectionForm.resetFields();
                }}
                okText="Cập nhật"
                cancelText="Hủy"
                width={600}
            >
                <Form form={sectionForm} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Tiêu đề Section"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input placeholder="Nhập tiêu đề section..." />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả (không bắt buộc)"
                    >
                        <TextArea
                            rows={3}
                            placeholder="Nhập mô tả ngắn về section..."
                            showCount
                            maxLength={200}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Add Lesson Modal */}
            <Modal
                title="Thêm Lesson mới"
                open={isAddLessonModalVisible}
                onOk={handleAddLesson}
                onCancel={() => {
                    setIsAddLessonModalVisible(false);
                    setCurrentSectionId('');
                    lessonForm.resetFields();
                    setVideoFileList([]);
                    setDocumentFileList([]);
                }}
                okText="Thêm"
                cancelText="Hủy"
                width={700}
            >
                <Form form={lessonForm} layout="vertical">
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                name="title"
                                label="Tiêu đề Lesson"
                                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                            >
                                <Input placeholder="Nhập tiêu đề lesson..." />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="type"
                                label="Loại Lesson"
                                rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}
                            >
                                <Select placeholder="Chọn loại lesson">
                                    <Option value="video">Video</Option>
                                    <Option value="document">Tài liệu</Option>
                                    <Option value="quiz">Bài tập</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
                    >
                        {({ getFieldValue }) => {
                            const lessonType = getFieldValue('type');

                            return (
                                <>
                                    {lessonType === 'video' && (
                                        <>
                                            <Form.Item
                                                name="duration"
                                                label="Thời lượng (phút)"
                                                rules={[{ required: true, message: 'Vui lòng nhập thời lượng!' }]}
                                            >
                                                <InputNumber
                                                    placeholder="Nhập thời lượng..."
                                                    min={1}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Upload Video"
                                                name="videoFile"
                                            >
                                                <Upload {...videoUploadProps}>
                                                    <Button icon={<UploadOutlined />}>Chọn file video</Button>
                                                </Upload>
                                                <div style={{ marginTop: 8, padding: 8, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 4 }}>
                                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                                        💡 <strong>Lưu ý:</strong> Nếu sử dụng Bunny.net CDN với authentication, video sẽ tự động được authenticate với token:
                                                        <Text code style={{ fontSize: 10 }}>7aec43d5-f3be-440f-b740-55fd5e455cf4</Text>
                                                    </Text>
                                                </div>
                                            </Form.Item>
                                        </>
                                    )}

                                    {lessonType === 'document' && (
                                        <Form.Item
                                            label="Upload Tài liệu"
                                            name="documentFile"
                                        >
                                            <Upload {...documentUploadProps}>
                                                <Button icon={<UploadOutlined />}>Chọn file tài liệu</Button>
                                            </Upload>
                                        </Form.Item>
                                    )}

                                    {lessonType === 'quiz' && (
                                        <Form.Item
                                            name="content"
                                            label="Nội dung bài tập"
                                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                                        >
                                            <TextArea
                                                rows={4}
                                                placeholder="Nhập nội dung bài tập..."
                                                showCount
                                                maxLength={1000}
                                            />
                                        </Form.Item>
                                    )}
                                </>
                            );
                        }}
                    </Form.Item>

                    <Form.Item
                        name="isPreview"
                        valuePropName="checked"
                    >
                        <Switch /> <span style={{ marginLeft: 8 }}>Cho phép xem trước miễn phí</span>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Edit Lesson Modal */}
            <Modal
                title="Chỉnh sửa Lesson"
                open={isEditLessonModalVisible}
                onOk={handleEditLesson}
                onCancel={() => {
                    setIsEditLessonModalVisible(false);
                    setCurrentLesson(null);
                    setCurrentSectionId('');
                    lessonForm.resetFields();
                    setVideoFileList([]);
                    setDocumentFileList([]);
                }}
                okText="Cập nhật"
                cancelText="Hủy"
                width={700}
            >
                <Form form={lessonForm} layout="vertical">
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                name="title"
                                label="Tiêu đề Lesson"
                                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                            >
                                <Input placeholder="Nhập tiêu đề lesson..." />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="type"
                                label="Loại Lesson"
                                rules={[{ required: true, message: 'Vui lòng chọn loại!' }]}
                            >
                                <Select placeholder="Chọn loại lesson">
                                    <Option value="video">Video</Option>
                                    <Option value="document">Tài liệu</Option>
                                    <Option value="quiz">Bài tập</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
                    >
                        {({ getFieldValue }) => {
                            const lessonType = getFieldValue('type');

                            return (
                                <>
                                    {lessonType === 'video' && (
                                        <>
                                            <Form.Item
                                                name="duration"
                                                label="Thời lượng (phút)"
                                                rules={[{ required: true, message: 'Vui lòng nhập thời lượng!' }]}
                                            >
                                                <InputNumber
                                                    placeholder="Nhập thời lượng..."
                                                    min={1}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Upload Video"
                                                name="videoFile"
                                            >
                                                <Upload {...videoUploadProps}>
                                                    <Button icon={<UploadOutlined />}>
                                                        {currentLesson?.videoUrl ? 'Thay đổi video' : 'Chọn file video'}
                                                    </Button>
                                                </Upload>
                                                {currentLesson?.videoUrl && (
                                                    <div className="current-file-info">
                                                        <Text type="secondary">Video hiện tại: </Text>
                                                        <Text code style={{ fontSize: '12px' }}>
                                                            {currentLesson.videoUrl.split('/').pop()}
                                                        </Text>
                                                    </div>
                                                )}
                                                <div style={{ marginTop: 8, padding: 8, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 4 }}>
                                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                                        💡 <strong>CDN Authentication:</strong> Bunny.net videos tự động được authenticate với token được cấu hình sẵn.
                                                    </Text>
                                                </div>
                                            </Form.Item>
                                        </>
                                    )}

                                    {lessonType === 'document' && (
                                        <Form.Item
                                            label="Upload Tài liệu"
                                            name="documentFile"
                                        >
                                            <Upload {...documentUploadProps}>
                                                <Button icon={<UploadOutlined />}>
                                                    {currentLesson?.documentUrl ? 'Thay đổi tài liệu' : 'Chọn file tài liệu'}
                                                </Button>
                                            </Upload>
                                            {currentLesson?.documentUrl && (
                                                <div className="current-file-info">
                                                    <Text type="secondary">Tài liệu hiện tại: </Text>
                                                    <Text code style={{ fontSize: '12px' }}>
                                                        {currentLesson.documentUrl.split('/').pop()}
                                                    </Text>
                                                </div>
                                            )}
                                        </Form.Item>
                                    )}

                                    {lessonType === 'quiz' && (
                                        <Form.Item
                                            name="content"
                                            label="Nội dung bài tập"
                                            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                                        >
                                            <TextArea
                                                rows={4}
                                                placeholder="Nhập nội dung bài tập..."
                                                showCount
                                                maxLength={1000}
                                            />
                                        </Form.Item>
                                    )}
                                </>
                            );
                        }}
                    </Form.Item>

                    <Form.Item
                        name="isPreview"
                        valuePropName="checked"
                    >
                        <Switch /> <span style={{ marginLeft: 8 }}>Cho phép xem trước miễn phí</span>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default EditCoursePage;
