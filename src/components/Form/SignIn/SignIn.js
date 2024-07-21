import React from 'react'
import { Button, Form, Input } from 'antd'

const SignIn = () => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        // отправка формы
        console.log('Received values of form: ', values)
    }

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ prefix: '86' }}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <span>Sing In</span>
            {/*нужно стилизовать */}

            <Form.Item
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
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
            <span>dont have an account</span>
            {/*нужно добавить ссылку на регистрацию и стилизовать*/}
        </Form>
    )
}

export default SignIn
