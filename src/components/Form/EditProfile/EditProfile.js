import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Flex, Form, Input } from 'antd'

import { updateUser } from '../../../Servises/authSlice'
import style from '../Form.module.css'

const EditProfile = () => {
    const [form] = Form.useForm()
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user && user.username) {
            form.setFieldsValue({
                username: user.username,
                email: user.email,
                image: user.image,
            })
        } else {
            console.log('User data is not available')
        }
    }, [user, form])

    useEffect(() => {}, [user.image])

    const onFinish = async (values) => {
        try {
            const response = await fetch('https://blog.kata.academy/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${user.token}`,
                },
                body: JSON.stringify({ user: values }),
            })
            if (!response.ok) {
                throw new Error('Ошибка сервера')
            }
            const data = await response.json()
            dispatch(updateUser(data.user))
            form.setFieldsValue({
                username: data.user.username,
                email: data.user.email,
                image: data.user.image,
            })
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    return (
        <div className={style.form}>
            <Form
                className={`${style.formIn} custom_style_position`}
                form={form}
                name="editProfile"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            >
                <span className={style.headerSpanStyle}>Edit Profile</span>
                <Form.Item
                    style={{ paddingBottom: '30px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="username"
                    label="Username"
                    tooltip="What do you want others to call you?"
                    rules={[
                        {
                            message: 'Please input your nickname!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '30px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '30px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="newPassword"
                    label="New Password"
                    rules={[
                        {
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '30px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="image"
                    label="Avatar image (URL)"
                    rules={[
                        {
                            type: 'url',
                            warningOnly: true,
                        },
                        {
                            type: 'string',
                            min: 6,
                        },
                    ]}
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>

                <Form.Item style={{ marginBottom: '0px' }}>
                    <Flex vertical gap="small" style={{ width: '100%' }}>
                        <Button type="primary" htmlType="submit" className={style.buttonFormHeight}>
                            Save Changes
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditProfile
