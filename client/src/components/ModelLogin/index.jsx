import React, { useState } from 'react';
import { Button, Drawer, Form, Input, DatePicker, Space, Radio } from 'antd';
import { FacebookFilled, GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import "./ModelLogin.scss";
import { Link } from 'react-router-dom';

ModelLogin.propTypes = {

};

function ModelLogin(props) {
    const [open, setOpen] = useState(false);
    const [onLogin, setOnLogin] = useState(true);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const handRegister = () => {
        setOnLogin(false);
    }
    const handLogin = () => {
        setOnLogin(true);
    }
    return (
        <div className="model-login">
            <Button type="primary" onClick={showDrawer}>
                Đăng kí/đăng nhập
            </Button>
            <Drawer placement="right" onClose={onClose} visible={open}>
                {onLogin ?
                    <div className="login">
                        <div className="title">ĐĂNG NHẬP</div>
                        <Form
                            size='large'
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                className='email-form'
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email không được bỏ trống',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email phải đúng định dạng'
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                className='passwd-form'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Mật khẩu không được bỏ trống',
                                    },
                                    {
                                        min: 4,
                                        message: 'Mật khẩu phải ít nhất 4 kí tự',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item className='btn-form'>
                                <Button type="primary" htmlType="submit" block className="login-form-button">
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="or">
                            <span>Hoặc</span>
                        </div>
                        <div className="social-login">
                            <div className="fb-login">
                                <Link to="">
                                    <Button type="primary" htmlType="submit" block>
                                        <span><FacebookFilled /></span>
                                        Đăng nhập với Facebook
                                    </Button>
                                </Link>
                            </div>
                            <div className="gg-login">
                                <Link to="">
                                    <Button type="primary" htmlType="submit" block danger>
                                        <span><GoogleOutlined /></span>
                                        Đăng nhập với Google
                                    </Button>
                                </Link>
                            </div>
                            <div className="not-account">
                                <span>Chưa có tài khoản ? </span>
                                <span onClick={handRegister} className='regis'>Đăng kí ngay</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="register">
                        <div className="title">ĐĂNG KÍ</div>
                        <Form
                            layout='vertical'
                            name="register"
                            className="register-form"

                            scrollToFirstError
                        >
                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: "email",
                                        message: "Vui lòng nhập đúng định dạng email",
                                    },
                                    {
                                        required: true,
                                        message: "Vui lòng điền email",
                                    }
                                ]}
                            >
                                <Input placeholder='Email' />

                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mật khẩu",
                                    },
                                    {
                                        min: 4,
                                        message: "Mật khẩu có độ dài ít nhất 4 kí tự",
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder='Mật khẩu ít nhất có 4 kí tự' />
                            </Form.Item>
                            <Form.Item
                                name="confirmPass"
                                label="Xác nhận mật khẩu"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập mật khẩu",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder='Mật khẩu ít nhất có 4 kí tự' />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Họ tên"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng điền họ tên",
                                    }
                                ]}
                            >
                                <Input placeholder='Họ tên' />
                            </Form.Item>
                            <Form.Item
                                label="Ngày sinh"
                                name="birthday"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn ngày sinh"
                                    }
                                ]}
                            >
                                <Space style={{ width: '100%' }}>
                                    <DatePicker />
                                </Space>
                            </Form.Item>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                            >
                                <Space style={{ width: '100%' }}>
                                    <Radio.Group defaultValue={1}>
                                        <Radio value={1}>Nam</Radio>
                                        <Radio value={2}>Nữ</Radio>
                                    </Radio.Group>
                                </Space>
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số điện thoại"
                                    },
                                    {
                                        min: 10,
                                        max: 10,
                                        message: "Vui lòng nhập đúng số điện thoại",
                                    },
                                    {
                                        value: [0 - 9],
                                        message: "Vui lòng chỉ nhập số",
                                    },
                                ]}
                            >
                                <Input placeholder='Số điện thoại' />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập địa chỉ "
                                    },
                                ]}
                            >
                                <Input placeholder='Địa chỉ' />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Đăng kí
                            </Button>
                        </Form>
                        <div className="have-account">
                            <span>Đã có tài khoản ? </span>
                            <span onClick={handLogin} className='lgin'>Đăng nhập ngay</span>
                        </div>
                    </div>
                }
            </Drawer>
        </div>
    );
}

export default ModelLogin;