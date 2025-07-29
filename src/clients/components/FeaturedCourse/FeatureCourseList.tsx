import React from 'react';
import { Typography, Row, Col } from 'antd';
import CourseGridList from '../Course/CourseGridList';
import './FeatureCourseList.scss';

const { Title, Paragraph } = Typography;

const FeaturedCourseList: React.FC = () => {
    return (
        <div className="featured-courses-section">
            <div className="container">
                <Row justify="center">
                    <Col span={24} style={{ textAlign: 'center', marginBottom: 48 }}>
                        <Title level={2} className="section-title">
                            Khóa học nổi bật
                        </Title>
                        <Paragraph className="section-description">
                            Khám phá những khóa học được đánh giá cao nhất từ các chuyên gia hàng đầu
                        </Paragraph>
                    </Col>
                </Row>

                <CourseGridList
                    filterType="featured"
                    showControls={false}
                />
            </div>
        </div>
    );
};

export default FeaturedCourseList;