import React from "react";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './ListCourseHeader.scss';
import CourseGridList from "./CourseGridList";

const ListCourseHeader: React.FC = () => {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: 'popular',
            label: 'Phổ biến nhất',
            children: <CourseGridList filterType="popular" showControls={false} />,
        },
        {
            key: 'featured',
            label: 'Nổi bật',
            children: <CourseGridList filterType="featured" showControls={false} />,
        },
        {
            key: 'new',
            label: 'Mới',
            children: <CourseGridList filterType="new" showControls={false} />,
        },
    ];

    return (
        <div className="list-course-header">
            <h1 className="header-title">Khóa học</h1>
            <p className="header-description">Khám phá nhiều khóa học của chúng tôi để nâng cao kỹ năng và kiến thức của bạn.</p>
            <Tabs
                defaultActiveKey="popular"
                items={items}
                onChange={onChange}
                className="course-tabs"
            />
        </div>
    );
}

export default ListCourseHeader;