import { Button, Col, Row } from "antd";
import { useState } from "react";
import CourseGridList from "../../components/Course/CourseGridList";
import ListFilter from "../../components/Filter/ListFilter";
import "./ListCoursePage.scss";
// import ListCourseHeader from "../../components/Course/ListCourseHeader";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

const ListCoursePage: React.FC = () => {
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [searchParams] = useSearchParams(); // Lấy query parameters

    // Parse categoryId từ URL parameter (có thể là 'category' hoặc 'categoryId')
    const categoryParam = searchParams.get('category') || searchParams.get('categoryId');
    const categoryId = categoryParam ? parseInt(categoryParam, 10) : undefined;

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    return (
        <div className="list-course-page-container">
            <Row justify="start">
                <Col span={24}>
                    {/* <ListCourseHeader /> */}
                </Col>
            </Row>

            <Row className="filter-sort-section">
                <Col span={24} className="filter-controls">
                    <Button>
                        <span>Sắp xếp theo</span>
                    </Button>
                    <Button
                        type="text"
                        onClick={toggleFilter}
                        icon={isFilterVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    >
                        {isFilterVisible ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                    </Button>
                </Col>
            </Row>

            <Row gutter={24} className="list-course-page">
                {isFilterVisible && (
                    <Col span={5} className="filter-column">
                        <div className="filter-container">
                            <ListFilter />
                        </div>
                    </Col>
                )}
                <Col span={isFilterVisible ? 19 : 24} className="course-column">
                    <CourseGridList categoryId={categoryId} />
                </Col>
            </Row>
        </div>
    );
}

export default ListCoursePage;