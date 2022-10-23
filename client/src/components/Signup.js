import React from 'react';

import { Form, Input } from 'antd';

const Signup = () => {
    return (
        <div className="su_form">
            <div className="su_form-header"> Sign Up </div>

            <Form
                name="signup-form"
                layout="vertical"
                initialValues={{ remember: true }}
                requiredMark={false}
            >
                <Form.Item
                    className="su_form-item"
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Username is required',
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Username" />
                </Form.Item>
            </Form>
        </div>
    );
};

export default Signup;