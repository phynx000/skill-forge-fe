import React, { useState } from 'react';
import { Tabs, Typography, Card, List, Avatar, Button, Space, Input, Rate, Modal, Form, Select, message } from 'antd';
import { MessageOutlined, UserOutlined, LikeOutlined, ClockCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined, TagOutlined } from '@ant-design/icons';
import './LessonTabs.scss';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface LessonTabsProps {
    currentLesson: {
        id: string;
        title: string;
        description: string;
        duration: string;
        objectives: string[];
    };
}

interface PersonalNote {
    id: string;
    title: string;
    content: string;
    timestamp: string;
    category: 'important' | 'question' | 'summary' | 'todo';
    lessonId: string;
}

const LessonTabs: React.FC<LessonTabsProps> = ({ currentLesson }) => {
    // State for personal notes
    const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>([
        {
            id: '1',
            title: 'Kiến thức quan trọng',
            content: 'useState và useEffect là 2 hooks cơ bản nhất trong React. Cần nắm vững cách sử dụng để tránh re-render không cần thiết.',
            timestamp: '2024-01-15 14:30',
            category: 'important',
            lessonId: currentLesson.id
        },
        {
            id: '2',
            title: 'Câu hỏi cần tìm hiểu',
            content: 'Làm thế nào để optimize performance khi component có nhiều state? Có nên sử dụng useReducer thay vì useState?',
            timestamp: '2024-01-15 15:45',
            category: 'question',
            lessonId: currentLesson.id
        }
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingNote, setEditingNote] = useState<PersonalNote | null>(null);
    const [form] = Form.useForm();

    const mockQAData = [
        {
            id: '1',
            user: 'Nguyễn Văn A',
            avatar: 'https://joeschmoe.io/api/v1/random',
            question: 'Làm thế nào để áp dụng kiến thức này vào dự án thực tế?',
            answer: 'Bạn có thể bắt đầu bằng cách tạo một dự án nhỏ và áp dụng từng bước một...',
            time: '2 giờ trước',
            likes: 5,
            replies: 3
        },
        {
            id: '2',
            user: 'Trần Thị B',
            avatar: 'https://joeschmoe.io/api/v1/random',
            question: 'Có tài liệu tham khảo thêm không?',
            answer: 'Tôi khuyên bạn nên đọc thêm tài liệu chính thức và thực hành nhiều...',
            time: '1 ngày trước',
            likes: 8,
            replies: 1
        }
    ];

    // Functions for managing personal notes
    const handleAddNote = () => {
        setEditingNote(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditNote = (note: PersonalNote) => {
        setEditingNote(note);
        form.setFieldsValue({
            title: note.title,
            content: note.content,
            category: note.category
        });
        setIsModalVisible(true);
    };

    const handleDeleteNote = (noteId: string) => {
        setPersonalNotes(prev => prev.filter(note => note.id !== noteId));
        message.success('Đã xóa ghi chú');
    };

    const handleSaveNote = async () => {
        try {
            const values = await form.validateFields();
            const timestamp = new Date().toLocaleString('vi-VN');

            if (editingNote) {
                // Update existing note
                setPersonalNotes(prev => prev.map(note =>
                    note.id === editingNote.id
                        ? { ...note, ...values, timestamp }
                        : note
                ));
                message.success('Đã cập nhật ghi chú');
            } else {
                // Add new note
                const newNote: PersonalNote = {
                    id: Date.now().toString(),
                    ...values,
                    timestamp,
                    lessonId: currentLesson.id
                };
                setPersonalNotes(prev => [newNote, ...prev]);
                message.success('Đã thêm ghi chú mới');
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const getCategoryColor = (category: string) => {
        const colors = {
            important: '#ff4d4f',
            question: '#faad14',
            summary: '#52c41a',
            todo: '#1890ff'
        };
        return colors[category as keyof typeof colors] || '#d9d9d9';
    };

    const getCategoryLabel = (category: string) => {
        const labels = {
            important: 'Quan trọng',
            question: 'Câu hỏi',
            summary: 'Tóm tắt',
            todo: 'Cần làm'
        };
        return labels[category as keyof typeof labels] || category;
    };

    const overviewTab = (
        <div className="overview-content">
            <Title level={4}>{currentLesson.title}</Title>
            <div className="lesson-meta">
                <Space>
                    <ClockCircleOutlined />
                    <Text type="secondary">{currentLesson.duration}</Text>
                </Space>
            </div>

            <Paragraph>{currentLesson.description}</Paragraph>

            <Title level={5}>Mục tiêu bài học:</Title>
            <ul className="lesson-objectives">
                {currentLesson.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                ))}
            </ul>

            <div className="lesson-rating">
                <Text>Đánh giá bài học:</Text>
                <Rate defaultValue={0} />
            </div>
        </div>
    );

    const qaTab = (
        <div className="qa-content">
            <div className="ask-question">
                <Title level={5}>Đặt câu hỏi mới</Title>
                <TextArea
                    rows={3}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="question-input"
                />
                <Button type="primary" style={{ marginTop: 8 }}>
                    Gửi câu hỏi
                </Button>
            </div>

            <List
                className="qa-list"
                dataSource={mockQAData}
                renderItem={(item) => (
                    <List.Item className="qa-item">
                        <Card>
                            <div className="qa-header">
                                <Avatar src={item.avatar} icon={<UserOutlined />} />
                                <div className="user-info">
                                    <Text strong>{item.user}</Text>
                                    <Text type="secondary">{item.time}</Text>
                                </div>
                            </div>

                            <div className="qa-question">
                                <Text strong>Q: </Text>
                                <Text>{item.question}</Text>
                            </div>

                            {item.answer && (
                                <div className="qa-answer">
                                    <Text strong>A: </Text>
                                    <Text>{item.answer}</Text>
                                </div>
                            )}

                            <div className="qa-actions">
                                <Space>
                                    <Button
                                        type="text"
                                        icon={<LikeOutlined />}
                                        size="small"
                                    >
                                        {item.likes}
                                    </Button>
                                    <Button
                                        type="text"
                                        icon={<MessageOutlined />}
                                        size="small"
                                    >
                                        {item.replies} phản hồi
                                    </Button>
                                </Space>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );

    const reminderTab = (
        <div className="notes-content">
            <div className="notes-header">
                <div className="notes-title">
                    <Title level={5}>Ghi chú cá nhân</Title>
                    <Text type="secondary">Lưu lại những điều quan trọng từ bài học</Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddNote}
                >
                    Thêm ghi chú
                </Button>
            </div>

            {personalNotes.length === 0 ? (
                <div className="empty-notes">
                    <Text type="secondary">
                        Chưa có ghi chú nào. Hãy thêm ghi chú đầu tiên của bạn!
                    </Text>
                </div>
            ) : (
                <List
                    dataSource={personalNotes}
                    renderItem={(note) => (
                        <List.Item className="note-item">
                            <Card
                                size="small"
                                className="note-card"
                                actions={[
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEditNote(note)}
                                    >
                                        Sửa
                                    </Button>,
                                    <Button
                                        type="text"
                                        size="small"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDeleteNote(note.id)}
                                    >
                                        Xóa
                                    </Button>
                                ]}
                            >
                                <div className="note-header">
                                    <div className="note-title-row">
                                        <Title level={5} className="note-title">{note.title}</Title>
                                        <div
                                            className="note-category"
                                            style={{
                                                backgroundColor: getCategoryColor(note.category),
                                                color: 'white'
                                            }}
                                        >
                                            <TagOutlined />
                                            {getCategoryLabel(note.category)}
                                        </div>
                                    </div>
                                    <Text type="secondary" className="note-timestamp">
                                        <ClockCircleOutlined /> {note.timestamp}
                                    </Text>
                                </div>
                                <Paragraph className="note-content">{note.content}</Paragraph>
                            </Card>
                        </List.Item>
                    )}
                />
            )}

            {/* Modal for adding/editing notes */}
            <Modal
                title={editingNote ? 'Sửa ghi chú' : 'Thêm ghi chú mới'}
                open={isModalVisible}
                onOk={handleSaveNote}
                onCancel={() => setIsModalVisible(false)}
                okText="Lưu"
                cancelText="Hủy"
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        category: 'important'
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input placeholder="Nhập tiêu đề ghi chú..." />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                    >
                        <Select placeholder="Chọn danh mục">
                            <Select.Option value="important">📌 Quan trọng</Select.Option>
                            <Select.Option value="question">❓ Câu hỏi</Select.Option>
                            <Select.Option value="summary">📝 Tóm tắt</Select.Option>
                            <Select.Option value="todo">✅ Cần làm</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Nhập nội dung ghi chú..."
                            showCount
                            maxLength={500}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );

    const tabItems = [
        {
            key: 'overview',
            label: 'Tổng quan',
            children: overviewTab
        },
        {
            key: 'qa',
            label: 'Hỏi & Đáp',
            children: qaTab
        },
        {
            key: 'reminder',
            label: 'Ghi chú',
            children: reminderTab
        }
    ];

    return (
        <div className="lesson-tabs">
            <Tabs
                defaultActiveKey="overview"
                items={tabItems}
                size="large"
            />
        </div>
    );
};

export default LessonTabs;
