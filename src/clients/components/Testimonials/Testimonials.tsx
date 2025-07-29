import React from 'react';
import { Row, Col, Card, Typography, Rate, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Testimonials.scss';

const { Title, Paragraph, Text } = Typography;

interface TestimonialData {
    id: string;
    name: string;
    role: string;
    company: string;
    rating: number;
    comment: string;
    avatar?: string;
}

const testimonialData: TestimonialData[] = [
    {
        id: '1',
        name: 'Nguyễn Văn An',
        role: 'Frontend Developer',
        company: 'Tech Corp',
        rating: 5,
        comment: 'SkillForge đã giúp tôi nâng cao kỹ năng lập trình React một cách đáng kể. Các khóa học rất thực tế và dễ hiểu.',
    },
    {
        id: '2',
        name: 'Trần Thị Bình',
        role: 'UI/UX Designer',
        company: 'Creative Studio',
        rating: 5,
        comment: 'Nền tảng học tập tuyệt vời với nhiều khóa học chất lượng. Tôi đã học được rất nhiều về thiết kế từ đây.',
    },
    {
        id: '3',
        name: 'Lê Minh Châu',
        role: 'Digital Marketer',
        company: 'Marketing Agency',
        rating: 4,
        comment: 'Khóa học marketing digital rất chi tiết và cập nhật. Giúp tôi áp dụng ngay vào công việc thực tế.',
    },
    {
        id: '4',
        name: 'Phạm Đức Dũng',
        role: 'Full Stack Developer',
        company: 'Startup Inc',
        rating: 5,
        comment: 'Giảng viên rất nhiệt tình, nội dung khóa học phong phú. Highly recommended cho ai muốn phát triển career.',
    },
    {
        id: '5',
        name: 'Hoàng Thị Evelyn',
        role: 'Business Analyst',
        company: 'Finance Corp',
        rating: 5,
        comment: 'Platform này đã thay đổi hoàn toàn cách tôi học hỏi. Nội dung chất lượng và rất dễ theo dõi.',
    },
    {
        id: '6',
        name: 'Vũ Quang Huy',
        role: 'Data Scientist',
        company: 'AI Labs',
        rating: 4,
        comment: 'Khóa học về Data Science và Machine Learning rất chuyên sâu. Đáng đồng tiền bát gạo!',
    },
];

const Testimonials: React.FC = () => {
    return (
        <div className="testimonials-section">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '64px' }}>
                    <Title level={2} className="section-title">
                        Học viên nói gì về SkillForge
                    </Title>
                    <Paragraph className="section-description">
                        Hàng nghìn học viên đã tin tưởng và thành công cùng SkillForge.
                        Nghe chia sẻ của họ về trải nghiệm học tập tại đây.
                    </Paragraph>
                </div>

                <Row gutter={[24, 24]}>
                    {testimonialData.map((testimonial) => (
                        <Col xs={24} md={12} lg={8} key={testimonial.id}>
                            <Card className="testimonial-card" bodyStyle={{ padding: '32px 24px' }}>
                                <div className="testimonial-content">
                                    <div className="rating-section">
                                        <Rate disabled defaultValue={testimonial.rating} />
                                    </div>

                                    <Paragraph className="testimonial-comment">
                                        "{testimonial.comment}"
                                    </Paragraph>

                                    <div className="testimonial-author">
                                        <Avatar
                                            size={48}
                                            icon={<UserOutlined />}
                                            src={testimonial.avatar}
                                            className="author-avatar"
                                        />
                                        <div className="author-info">
                                            <Text strong className="author-name">
                                                {testimonial.name}
                                            </Text>
                                            <br />
                                            <Text type="secondary" className="author-role">
                                                {testimonial.role} tại {testimonial.company}
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="testimonials-stats">
                    <Row gutter={[48, 24]} justify="center">
                        <Col xs={12} sm={6}>
                            <div className="stat-item">
                                <div className="stat-number">50,000+</div>
                                <div className="stat-label">Học viên</div>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="stat-item">
                                <div className="stat-number">1,000+</div>
                                <div className="stat-label">Khóa học</div>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="stat-item">
                                <div className="stat-number">4.8/5</div>
                                <div className="stat-label">Đánh giá TB</div>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="stat-item">
                                <div className="stat-number">95%</div>
                                <div className="stat-label">Hài lòng</div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
