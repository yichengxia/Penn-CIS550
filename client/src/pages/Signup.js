import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Row, Divider, message } from "antd";
import SplitLayout from "../components/SplitLayout";
import { useSignup } from "hooks";

const Signup = () => {
  const [signup] = useSignup();
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
    const responseStatus = await signup(username, password);
    switch (responseStatus) {
      case 201:
        message.success(`Registration Success: Welcome, ${username}!`);
        navigate("/");
        break;
      case 409:
        message.error("Registration Failed: You already have an account.");
        navigate("/login");
        break;
      default:
        message.error("Registration Failed: Something went wrong!");
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
      <SplitLayout imageUrl="images/signup.jpeg" contentLayout="right">
        <Row className="auth-form-container" justify="center">
          <div className="auth-form">
            <div className="auth-form-header"> Sign Up </div>
            <Form
              name="signup-form"
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
                  Sign Up
                </Button>
              </Form.Item>
            </Form>

            <Row className="auth-prompt">
              <div>
                <span>Already have an account? </span>
                <Link to="/login">Log in</Link>
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

export default Signup;