import React from "react";
import { Button, Form, Input, Row, Divider } from "antd";
import SplitLayout from "../../components/SplitLayout/SplitLayout";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <img className="login-logo" src="images/logo.svg" alt="logo" />

      <SplitLayout imageUrl="images/login.jpeg" contentLayout="left">
        <Row className="login-form-container" justify="center">
          <div className="login-form">
            <div className="login-form-header"> Login </div>
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
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
                <Input placeholder="Username" />
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
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  className="login-form-button"
                  htmlType="submit"
                  type="primary"
                  block
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <Row className="login-prompt">
              <div>
                <span>Not registered yet? </span>
                <a href="/">Create an account</a>
              </div>
            </Row>

            <Divider plain>OR</Divider>

            <div className="login-icon-container">
              <img
                className="login-icon-google"
                src="icons/google.svg"
                alt="google"
              />

              <img
                className="login-icon-twitter"
                src="icons/twitter.svg"
                alt="twitter"
              />
            </div>
          </div>
        </Row>
      </SplitLayout>
    </>
  );
};

export default Login;
