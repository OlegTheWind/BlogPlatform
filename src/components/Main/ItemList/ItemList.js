import React from 'react';
import './index.css';
import { HeartOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Tag } from 'antd';

const data = Array.from({ length: 3 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const ItemList = () => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
        }}
        dataSource={data}
        footer={
            <div>
                <b>ant design</b> footer part
            </div>
        }
        renderItem={(item) => (
            <List.Item
                key={item.title}
                actions={[
                    <IconText icon={HeartOutlined} text="156" key="list-vertical-like-o" />,
                ]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                        <>
                            <a href={item.href}>{item.title}</a>
                        </>
                    }
                />
                <Tag closeIcon={<CloseCircleOutlined />} onClose={() => console.log('Tag closed')}>
                    Tag 2
                </Tag>
                {item.content}
            </List.Item>
        )}
    />
);

export default ItemList;