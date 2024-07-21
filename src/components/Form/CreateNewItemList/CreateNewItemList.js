import React, { useState } from 'react'
import { Button, Form, Input, Select } from 'antd'

const { Option } = Select

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}

const CreateNewArticle = () => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        console.log('Received values of form: ', values)
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    )

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    )

    const [autoCompleteResult, setAutoCompleteResult] = useState([])

    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([])
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`))
        }
    }

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }))

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item
                name="title"
                label="Title"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: 'Please input your title!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="short description"
                label="Short description"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: 'Please input your Short description!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="text" label="Text" rules={[{ required: true, message: 'Please input Text' }]}>
                <Input.TextArea showCount maxLength={1000} />
            </Form.Item>

            <Form.Item>
                <Input />
                <Button type="primary" htmlType="submit">
                    Delete
                </Button>
                <Button type="primary" htmlType="submit">
                    Add tag
                </Button>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateNewArticle
