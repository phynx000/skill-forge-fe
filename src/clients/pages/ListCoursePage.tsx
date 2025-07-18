import { Button, Col, Row, Space } from "antd";
import ListCourse from "../components/Course/ListCourse";
import ListFilter from "../components/Filter/ListFilter";
import "./listCoursePage.scss";
import ListCourseHeader from "../components/Course/ListCourseHeader";
import FilterOutlined from "@ant-design/icons/lib/icons/FilterOutlined";

const ListCoursePage: React.FC = () => {
    return (
        <div className="list-course-page-container">
            <Row>
                <Col span={24}>
                    <ListCourseHeader />
                </Col>
            </Row>
            <Row>
                <Button>
                    <FilterOutlined />
                    <span>Bộ lọc</span>
                </Button>
                <Button>
                    <span>Sắp xếp theo</span>
                    
                </Button>
            </Row>

            <Row gutter={16} className="list-course-page">
                <Col span={6}>
                    <ListFilter />
                </Col>
                <Col span={18}>
                    <ListCourse />
                </Col>
            </Row>
        </div>
    );
}

export default ListCoursePage;