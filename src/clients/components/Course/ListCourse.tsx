import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Col, List, Row, Space } from 'antd';
import React from 'react';



const data = Array.from({ length: 23 }).map((_, i) => ({
    href: '#',
    title: `Khóa học ${i}`,
    subDescription: 'Chỉ học những gì cần thiết để làm việc',
    author: 'futo'

}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const ListCourse: React.FC = () => {
    return (
        <div className="list-course-page-container">
            <Row justify="end" className="list-course">
                <Col span={24}>
                    <div style={{ background: '#fff', minHeight: 360, }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => console.log(page),
                                pageSize: 10,
                            }}
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <IconText icon={StarOutlined} text="156" key="star" />,
                                        <IconText icon={LikeOutlined} text="156" key="like" />,
                                        <IconText icon={MessageOutlined} text="2" key="message" />,
                                    ]}
                                >
                                    <Row gutter={10} style={{ maxHeight: 360 }}>
                                        <Col xs={24} sm={7} >
                                            <img
                                                width="100%"
                                                height="100%"
                                                alt="logo"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                                style={{ borderRadius: 8, maxHeight: 280, maxWidth: 400 }}
                                            />
                                        </Col>
                                        <Col xs={24} sm={14}>
                                            <List.Item.Meta
                                                title={<a href={item.href}>{item.title}</a>}
                                                description={item.subDescription}
                                            />
                                            <div>{item.author}</div>
                                        </Col>
                                        <Col sm={2}>
                                            <a href="#">999$</a>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />

                    </div>
                </Col>
            </Row>
        </div>

    );
}

export default ListCourse;