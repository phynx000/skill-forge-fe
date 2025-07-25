import React from 'react';
import { Card, List } from 'antd';


const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];




const FeaturedCourseList: React.FC = () => {
    return (
        <div className="list-featured">
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.title}>Card content</Card>
                    </List.Item>
                )}
            />
        </div>

    );
}

export default FeaturedCourseList;