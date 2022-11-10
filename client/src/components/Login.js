import React from "react";
import { Button, Form, Input, Row, Col, Divider, Image } from "antd";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-view">
      <Row>
        <Col span={10} offset={4} className="lv_form-container">
          <div className="lv_form">
            <div className="lv_form-header"> Login </div>
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
                    message: "Please input your username!",
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
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  className="login-button"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Divider orientation="center">OR</Divider>
            {/* <Row className='fb'>
                            <FacebookLoginButton />
                        </Row>
                        <Row className='gg'>
                            <GoogleLoginButton />
                        </Row> */}
            <Row className="prompt">
              <div>
                <span>Not registered yet? </span>
                <a href="/">Create an account</a>
              </div>
            </Row>
          </div>
        </Col>
        <Col span={10}>
          <Image
            src="images/login.jpeg"
            alt="login"
            preview={false}
            className="login-img"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
