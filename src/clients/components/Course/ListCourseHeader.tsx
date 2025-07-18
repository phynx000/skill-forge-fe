import type React from "react";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './ListCourseHeader.scss';


const ListCourseHeader: React.FC = () => {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Phổ biến nhất',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Mới',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Thịnh hành',
            children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <div className="list-course-header">
            <h1 className="header-title">Khóa học</h1>
            <p className="header-description">Khám phá nhiều khóa học của chúng tôi để nâng cao kỹ năng và kiến thức của bạn.</p>
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                className="course-tabs"
            />
        </div>
    );
}

export default ListCourseHeader;