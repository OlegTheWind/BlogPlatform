import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Flex } from 'antd'

import { useGetArticleQuery, useUpdateArticleMutation } from '../../../Servises/Servises'
import style from '../Form.module.css'
import styleCreate from '../CreateNewItemList/CreateNewItemList.module.css'
import styleEdit from './EditItemList.module.css'

const EditItemList = () => {
    const { slug } = useParams()
    const { data, error, isLoading, refetch } = useGetArticleQuery(slug)
    const [updateArticle] = useUpdateArticleMutation()
    const user = useSelector((state) => state.auth.user)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const [tags, setTags] = useState([])

    useEffect(() => {
        if (data?.article) {
            const { title, description, body, tagList } = data.article
            setTags(tagList)
            form.setFieldsValue({
                title,
                description,
                body,
                tagList,
            })
        }
    }, [data, form])

    const handleAddTag = () => {
        const tag = inputRef.current.input.value.trim()
        if (tag && !tags.includes(tag)) {
            const newTags = [...tags, tag]
            setTags(newTags)
            form.setFieldsValue({
                tagList: newTags,
            })
            inputRef.current.input.value = ''
        } else if (tags.includes(tag)) {
            alert(`Такой тег уже существует: ${tags}`)
        }
    }

    const handleDeleteTag = (index) => {
        const newTags = [...tags]
        newTags.splice(index, 1)
        setTags(newTags)
        form.setFieldsValue({
            tagList: newTags,
        })
    }

    const onFinish = async (values) => {
        try {
            const updatedArticle = {
                ...values,
                tagList: tags.map((tag) => tag.trim()),
            }
            await updateArticle({ slug, article: updatedArticle, token: user.token })
            await refetch()
            navigate(`/articles/${slug}`)
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className={style.form}>
            <Form
                className={`${styleCreate.formCreate} ${style.formIn} `}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ title: '', description: '', text: '', tagList: tags }}
                scrollToFirstError
            >
                <span className={style.headerSpanStyle}>Edit article</span>
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
                    name="body"
                    label="Text"
                    rules={[{ required: true, message: 'Please input Text' }]}
                >
                    <Input.TextArea showCount maxLength={10000} style={{ height: 168 }} />
                </Form.Item>

                <Form.Item
                    style={{
                        marginBottom: 0,
                        display: 'flex',
                        alignItems: 'flex-start',
                        minHeight: 200,
                        flexDirection: 'column',
                        overflow: 'auto',
                    }}
                    className="custom_style_edit_position"
                    name="tagList"
                    label="Tags"
                >
                    <Flex gap="small" style={{ width: '100%', flexDirection: 'column' }}>
                        {tags.map((tag, index) => (
                            <Flex key={index} align="center" gap="small" style={{ flexDirection: 'row' }}>
                                <Input
                                    className={styleEdit.tagBlock}
                                    value={tag}
                                    onChange={(e) => {
                                        const newTags = [...tags]
                                        newTags[index] = e.target.value
                                        setTags(newTags)
                                        form.setFieldsValue({
                                            tagList: newTags,
                                        })
                                    }}
                                    style={{ overflow: 'auto', height: 40 }}
                                />
                                <Button type="primary" danger ghost onClick={() => handleDeleteTag(index)}>
                                    Delete
                                </Button>
                            </Flex>
                        ))}
                        <Flex style={{ gap: 8 }}>
                            <Input
                                ref={inputRef}
                                name="tagList"
                                style={{ width: '50%' }}
                                placeholder="Enter tags separated by commas"
                            />
                            <Button onClick={handleAddTag} style={{ width: '30%' }}>
                                Add
                            </Button>
                        </Flex>
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

export default EditItemList
