import { Form, Input, Button, Card, message, Popover } from "antd"
import "./index.css";
import http from "../../api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateName } from "../../redux/features/sellPhoneSlice";

function Login(props) {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    // show success message
    const showSuccess = () => {
        setTimeout(() => {
            message.success('Login success!')
        })
        console.log(`form submitted successfully`)
    }

    //show error message
    const showError = (error) => {
        setTimeout(() => {
            message.error(error)
        })
        console.log(`There was an error submitting the form`)
        console.log(error)
    }

    const handleSubmit = async (values) => {
        await http.post('/users/login', values)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("accessToken", res.data.token);
                    localStorage.setItem("userId", res.data.data.userId);
                    localStorage.setItem("firstname", res.data.data.firstname);
                    localStorage.setItem("lastname", res.data.data.lastname);
                    dispatch(updateName({firstname: res.data.data.firstname, lastname: res.data.data.lastname}));
                    showSuccess();
                    navigate('/home');
                }
            })
            .catch(res => showError(res.response.data.error))

    }

    const content = (
        <div>
            <p>email: anita.simpson@hooli.com</p>
            <p>password: 31112374</p>
        </div>
    );


    return (
        <div className="login-wrapper">
            <div className="card-wrapper">
                <Card className="card-style">
                    <div className="card-content">
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                        <h1 style={{ color: "#40a9ff", margin: "0 auto" }}>SellPhones</h1>
                    </div>
                    <Form name="loginForm" labelCol={{ span: 6 }} wrapperCol={{ offset: 1, span: 17 }} onFinish={handleSubmit} >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your email address!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password!',
                                },
                            ]}
                        >
                            <Input.Password visibilityToggle="true" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
                            <Button type="primary" htmlType="submit">
                                Log in
                            </Button>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
                            <Link to="/register">
                                <Button>Create an Account</Button>
                            </Link>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
                            <Link to="/">
                                <Button>Skip Log in</Button>
                            </Link>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
                            <Popover content={content} title="Test Example">
                                <Button> Login Test Example </Button>
                            </Popover>
                        </Form.Item>
                    </Form>
                    </div>
                </Card>
                <video id="videoBG" autoPlay muted loop>
                <source src={require('../../video/test3.mp4')} type="video/mp4"></source>
            </video>
            </div>
            <div className="animated-title">
                <div className="text-top">
                    <div>
                        <span>Find</span>
                        <span>what you want</span>
                    </div>
                </div>
                <div className="text-bottom">
                    <div>in Sellphones!</div>
                </div>
            </div>
        </div>

    )
}

export default Login;