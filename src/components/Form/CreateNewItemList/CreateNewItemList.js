import React, { useState } from 'react'
import { Button, Flex, Form, Input } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import style from '../Form.module.css'
import styleCreate from './CreateNewItemList.module.css'

const CreateNewItemList = () => {
    const [form] = Form.useForm()
    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate()

    const [tags, setTags] = useState([])
    const [isSuccess, setIsSuccess] = useState(false) // State to track success

    const onFinish = async (values) => {
        console.log('Received values of form: ', values)
        if (!token) {
            console.error('No token found')
            return
        }

        console.log('Token:', token)

        try {
            const response = await fetch('https://blog.kata.academy/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    article: {
                        title: values.title,
                        description: values.description,
                        body: values.text,
                        tagList: tags,
                    },
                }),
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            console.log('Success:', data)
            setIsSuccess(true) // Set success state to true
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleAddTag = () => {
        const tag = form.getFieldValue('tagInput')
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag])
            form.setFieldsValue({
                tagInput: '',
            })
        } else {
            return alert(`такой тег уже существует ${tags}`)
        }
    }

    const handleDeleteTag = (index) => {
        const newTags = [...tags]
        newTags.splice(index, 1)
        setTags(newTags)
    }

    if (isSuccess) {
        navigate('/')
        return <div>Article successfully added!</div>
    }

    return (
        <div className={style.form}>
            <Form
                className={`${styleCreate.formCreate} ${style.formIn} `}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                scrollToFirstError
            >
                <span className={style.headerSpanStyle}>Create new article</span>
                <Form.Item
                    style={{ paddingBottom: '40px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="title"
                    label="Title"
                    tooltip="What do you want others to call you?"
                    rules={[{ required: true, message: 'Please input your title!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '40px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="description"
                    label="Short description"
                    rules={[{ required: true, whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '200px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="text"
                    label="Text"
                    rules={[{ required: true, message: 'Please input Text' }]}
                >
                    <Input.TextArea
                        maxLength={10000}
                        style={{ maxHeight: 190, overflowY: 'auto' }}
                        autoSize={{ minRows: 6 }}
                    />
                </Form.Item>

                <Flex gap="small" style={{ width: '40%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                    {tags.map((tag, index) => (
                        <Flex key={index} align="center" gap="small" style={{ flexDirection: 'row' }}>
                            <Input
                                className={styleCreate.blockText}
                                value={tag}
                                style={{ overflow: 'auto', height: 40 }}
                                onChange={(e) => {
                                    const newTags = [...tags]
                                    newTags[index] = e.target.value
                                    setTags(newTags)
                                }}
                            />
                            <Button type="primary" onClick={() => handleDeleteTag(index)} danger ghost>
                                Delete
                            </Button>
                        </Flex>
                    ))}
                </Flex>

                <Form.Item
                    style={{ paddingBottom: '100px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="tagInput"
                    label="Tags"
                    rules={[{ message: 'Please input Tags' }]}
                >
                    <Flex gap="small" style={{ width: '40%' }}>
                        <Input placeholder="Enter tags separated by commas" style={{ width: '60%' }} />
                        <Button
                            onClick={handleAddTag}
                            style={{ width: '35%', color: '#1890FF', borderColor: '#1890FF' }}
                        >
                            Add tag
                        </Button>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Flex vertical gap="small" style={{ width: '30%' }}>
                        <Button type="primary" htmlType="submit">
                            Send
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateNewItemList
