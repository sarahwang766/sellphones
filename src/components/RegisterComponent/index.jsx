import React, { Component } from "react";
// import styles from './auth.module.css';
import { Form, Input, Button, Checkbox, message, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import http from "../../api";


function RegisterComponent() {
    let navigate = useNavigate();
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    //show success mesage
    const showSuccess = () => {
        setTimeout(() => {
            message.success('Register success! Verify Email send success')
        })
    }

    //show error message
    const showError = (error) => {
        setTimeout(() => {
            message.error(error)
        })
    }
    //submit form
    const handleSubmit = async (values) => {
        setConfirmLoading(true);
        await http.post('/users/register', values)
            .then((res) => {
                if (res.status === 200) {
                    // http.post('http://localhost:5001/users/verifyemail', {
                    //     email: values.email
                    // })
                    //     .then((res) => {
                    //         if (res.status === 200) {
                    setConfirmLoading(false);
                    navigate('/login');
                    showSuccess()
                    //     }
                    // })
                }
            })
            .catch(res => showError(res.response.data.error))
        setConfirmLoading(false);
    }

    return (
        <Form
            name="normal_login"
            // className={styles.login_form}
            initialValues={{
                remember: true,
            }}
            onFinish={handleSubmit}>
            <Form.Item
                name="firstname"
                rules={[
                    {
                        required: true,
                        message: 'Please input your firstname!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="firstname" />
            </Form.Item>
            <Form.Item
                name="lastname"
                rules={[
                    {
                        required: true,
                        message: 'Please input your lastname!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="lastname" />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                name="password2"
                rules={[
                    {
                        required: true,
                        message: 'Please input your confirm password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="confirm password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit"
                    // className={styles.login_form_button}
                    loading={confirmLoading} >
                    Register
                </Button>
            </Form.Item>
            <Form.Item>
                <Link to="/login">
                    <p style={{ textDecoration: "underline" }}>Back to Login</p>
                </Link>
            </Form.Item>
        </Form>
    );
}

export default RegisterComponent;





