import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Row, Divider, message } from "antd";
import SplitLayout from "../components/SplitLayout";
import { useLogin } from "hooks";

const Login = () => {
  const [login] = useLogin();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFinish = async () => {
    form.resetFields();
    const responseStatus = await login(username, password);
    switch (responseStatus) {
      case 200:
        message.success(`Login Success: Welcome back, ${username}!`);
        navigate("/");
        break;
      case 401:
        message.error(
          "Login Failed: Incorrect password, or account doesn't exist."
        );
        break;
      default:
        message.error("Login Failed: Something went wrong!");
    }
  };

  return (
    <>
      <img
        className="auth-logo"
        src="images/logo.svg"
        alt="logo"
        onClick={() => navigate("/")}
      />
      <SplitLayout imageUrl="images/login.jpeg" contentLayout="left">
        <Row className="auth-form-container" justify="center">
          <div className="auth-form">
            <div className="auth-form-header"> Login </div>
            <Form
              name="login-form"
              layout="vertical"
              form={form}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              requiredMark={false}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Username is required",
                  },
                ]}
              >
                <Input
                  placeholder="Username"
                  name="username"
                  onChange={onChange}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password is required",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="auth-form-button"
                  htmlType="submit"
                  type="primary"
                  block
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <Row className="auth-prompt">
              <div>
                <span>Not registered yet? </span>
                <Link to="/signup">Create an account</Link>
              </div>
            </Row>

            <Divider plain>OR</Divider>

            <div className="auth-icon-container">
              <a href="/auth/google">
                <img
                  className="auth-icon-google"
                  src="icons/google.svg"
                  alt="google"
                />
              </a>

              <a href="/auth/twitter">
                <img
                  className="auth-icon-twitter"
                  src="icons/twitter.svg"
                  alt="twitter"
                />
              </a>
            </div>
          </div>
        </Row>
      </SplitLayout>
    </>
  );
};

export default Login;
