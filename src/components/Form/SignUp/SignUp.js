import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Checkbox, Flex, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

import { login } from '../../../Servises/authSlice'
import style from '../Form.module.css'
import styleSignUp from './SIgnUp.module.css'

import '../../../index.scss'

const SignUp = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        try {
            const response = await fetch('https://blog.kata.academy/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: values }),
            })
            const data = await response.json()
            if (data.errors) {
                form.setFields([
                    {
                        name: 'username',
                        errors: data.errors.username ? ['Такой логин уже зарегистрирован'] : [],
                    },
                    {
                        name: 'email',
                        errors: data.errors.email ? ['Такой email уже зарегистрирован '] : [],
                    },
                ])
            }
            if (!response.ok) {
                throw new Error('Ошибка сервера')
            }
            dispatch(login(data.user.token))
        } catch (error) {
            console.log('Ошибка сервера')
        }
    }
    const validateUsernameLength = (rule, value) => {
        if (!value) {
            return Promise.reject('')
        }
        if (value.length < 4) {
            return Promise.reject('Username must be at least 4 characters long!')
        }
        return Promise.resolve()
    }

    const validatePassword = (rule, value) => {
        if (!value) {
            return Promise.reject('')
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,32}$/.test(value)) {
            return Promise.reject(
                'Password must contain at least one lowercase letter, one uppercase letter, and one digit, and be between 8 and 32 characters long.',
            )
        }
        return Promise.resolve()
    }

    return (
        <div className={style.form}>
            <Form
                className={`${style.formIn} ${styleSignUp.formSignUp}`}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ prefix: '86' }}
                scrollToFirstError
            >
                <span className={style.headerSpanStyle}>Create new account</span>
                <Form.Item
                    style={{ paddingBottom: '40px', marginBottom: 0 }}
                    name="username"
                    label="Username"
                    tooltip="What do you want others to call you?"
                    rules={[
                        { required: true, message: 'Please input your username!', whitespace: true },
                        { validator: validateUsernameLength },
                    ]}
                    className={`${style.userName} ant-form-item-required custom_style_position`}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '40px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="email"
                    label="E-mail"
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
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '100px', marginBottom: 0 }}
                    className="custom_style_position"
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        { validator: validatePassword },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '55px', marginBottom: 0, boxShadow: '0 1px 0 0 #E8E8E8' }}
                    className="custom_style_position"
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error('Passwords must match'))
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    style={{ paddingBottom: '70px', marginBottom: 0, paddingTop: 5 }}
                    className="custom_style_position"
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                >
                    <Checkbox className={style.styleCheckbox}>
                        I agree to the processing of my personal information
                    </Checkbox>
                </Form.Item>

                <Form.Item style={{ marginBottom: '0px' }}>
                    <Flex vertical gap="small" style={{ width: '100%' }}>
                        <Button type="primary" htmlType="submit" className={style.buttonFormHeight}>
                            Register
                        </Button>
                    </Flex>
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={{ paddingRight: 3 }} className={`${style.styleTextForm} ${style.styleTextFormColor}`}>
                        Already have an account?{' '}
                    </span>
                    <Link to="/sign-in" className={style.styleTextForm}>
                        {' '}
                        Sign In.
                    </Link>
                </div>
            </Form>
        </div>
    )
}

export default SignUp
