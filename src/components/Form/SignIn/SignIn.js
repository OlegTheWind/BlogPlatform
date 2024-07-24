import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Flex, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { login } from '../../../Servises/authSlice'
import style from '../Form.module.css'
import styleSign from './SignIn.module.css'

const SignIn = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const response = await fetch('https://blog.kata.academy/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: values }),
            })
            const data = await response.json()
            if (data.errors && data.errors['email or password']) {
                form.setFields([
                    {
                        name: 'email',
                        errors: ['Email or password is invalid'],
                    },
                    {
                        name: 'password',
                        errors: ['Email or password is invalid'],
                    },
                ])
            }
            if (!response.ok) {
                throw new Error('Server error')
            } else {
                dispatch(login({ token: data.user.token, user: data.user }))
                navigate('/')
            }
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    return (
        <div className={style.form}>
            <Form
                className={`${style.formIn} ${styleSign.formSign}`}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ prefix: '86' }}
                scrollToFirstError
            >
                <span className={style.headerSpanStyle}>Sign In</span>
                <Form.Item
                    style={{ paddingBottom: '55px', marginBottom: 0 }}
                    className={`${style.customFormItem} custom_style_position`}
                    name="email"
                    label={<span className={style.customLabel}>E-mail</span>}
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input placeholder="Email adress" />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '55px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item style={{ marginBottom: '0px' }}>
                    <Flex vertical gap="small" style={{ width: '100%' }}>
                        <Button type="primary" htmlType="submit" className={style.buttonFormHeight}>
                            Login
                        </Button>
                    </Flex>
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={{ paddingRight: 3 }} className={`${style.styleTextForm} ${style.styleTextFormColor}`}>
                        Dont have an account?{' '}
                    </span>
                    <Link to="/sign-up" className={style.styleTextForm}>
                        {' '}
                        Register
                    </Link>
                </div>
            </Form>
        </div>
    )
}
export default SignIn
