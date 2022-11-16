import React, { useState } from 'react';
import { Button, Drawer, Form, Input, DatePicker, Space, Radio, Select } from 'antd';
import { FacebookFilled, FacebookOutlined, GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';
import { useDispatch, useSelector } from 'react-redux';

import "./ModelLogin.scss";
import { Link, useNavigate } from 'react-router-dom';
import { getMe, login, login_socialMedia } from 'app/authSlice';
import { toastError, toastSucsess } from 'utils/notification';
import { thanhvienApi } from 'api/thanhvienApi';
import { showLogin } from 'features/Lug/userSlice';

ModelLogin.propTypes = {

};

function ModelLogin(props) {
    const [open, setOpen] = useState(false);
    const [onLogin, setOnLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const { logged } = useSelector(state => state.userInfo);
    const { user } = useSelector(state => state.auth)
    const [formLogin] = Form.useForm();
    const navigate = useNavigate();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        dispatch(showLogin(false))
    };

    const handRegister = () => {
        setOnLogin(false);
    }
    const handLogin = () => {
        setOnLogin(true);
    }

    const handleLogin = async (values) => {
        setIsLoading(true)
        const { error, payload } = await dispatch(login(values));

        if (error) {
            const { message } = payload.response.data;
            toastError(message);
            setIsLoading(false)
            return;
        } else {
            setOpen(false);
            setIsLoading(false);
            console.log(payload)
            toastSucsess("Đăng nhập thành công");
        }
    }
    const onLoginSuccess = async ({ provider, data }) => {
        // console.log(data);
        const token = data.access_token || data.accessToken;
        const HO_TEN = (data.family_name && data.given_name) ? data.family_name + ' ' + data.given_name : '';
        const accountType = provider + "_mxh";
        const user = {
            TV_ID: data.id,
            TV_HOTEN: data.name || HO_TEN,
            TV_SODIENTHOAI: data.phone || '',
            TV_EMAIL: data.email,
            TV_AVATAR: data.picture?.data?.url || data.picture,
            TV_LOAITAIKHOAN: accountType,
        }
        console.log({ data, user })
        // send to sever
        setIsLoading(true);
        await dispatch(login_socialMedia(user));
        // dispatch(switch_screenLogin(false));
        setOpen(false);
        setIsLoading(false);
        toastSucsess("Đăng nhập thành công");

    }

    const onLoginError = (error) => {
        console.log(error);
        toastError("Đã có lỗi xảy ra");
    }

    const handleSaveRegister = async (values) => {
        try {
            setIsLoading(true);

            console.log(values)

            const { message } = await thanhvienApi.register(values);
            setIsLoading(false);
            toastSucsess(message);
            setOnLogin(true);

        } catch (error) {
            setIsLoading(false);
            toastError(error.response.data.message);
        }
    }

    return (
        <div className="model-login">
            <Button type="primary" onClick={() => dispatch(showLogin(true))}>
                Đăng kí/đăng nhập
            </Button>
            <Drawer placement="right" onClose={onClose} visible={logged}>
                {onLogin ?
                    <Form
                        form={formLogin}
                        size='large'
                        name="normal_login"
                        className="login-form"
                        onFinish={handleLogin}
                    >
                        <div className="login">
                            <div className="title">ĐĂNG NHẬP</div>

                            <Form.Item
                                className='email-form'
                                name="EMAIL"
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
                                name="MATKHAU"
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
                                <Button
                                    type="primary"
                                    loading={isLoading}
                                    htmlType="submit" block
                                    className="login-form-button"
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>

                            <div className="or">
                                <span>Hoặc</span>
                            </div>
                            <div className="social-login">
                                <div className="fb-login">
                                    <LoginSocialFacebook
                                        appId={process.env.REACT_APP_FB_CLIENT_ID || ''}
                                        // scope='https://www.Facebookapis.com/auth/userinfo.email'
                                        onResolve={onLoginSuccess}
                                        onReject={onLoginError}
                                        onLoginStart={() => console.log(process.env.REACT_APP_FB_CLIENT_ID)}
                                    >
                                        <Button type="primary" loading={isLoading} block>
                                            <span><FacebookOutlined /></span>
                                            Đăng nhập với Facebook
                                        </Button>
                                    </LoginSocialFacebook>
                                </div>
                                <div className="gg-login">
                                    <LoginSocialGoogle
                                        client_id={process.env.REACT_APP_GG_CLIENT_ID || ''}
                                        // scope='https://www.googleapis.com/auth/userinfo.email'
                                        onResolve={onLoginSuccess}
                                        onReject={onLoginError}
                                        onLoginStart={() => console.log("values")}
                                    >
                                        <Button type="primary" loading={isLoading} block danger>
                                            <span><GoogleOutlined /></span>
                                            Đăng nhập với Google
                                        </Button>
                                    </LoginSocialGoogle>
                                </div>
                                <div className="not-account">
                                    <span>Chưa có tài khoản ? </span>
                                    <span onClick={handRegister} className='regis'>Đăng kí ngay</span>
                                </div>
                            </div>
                        </div>
                    </Form>
                    :
                    <div className="register">
                        <div className="title">ĐĂNG KÍ</div>
                        <Form
                            layout='vertical'
                            name="register"
                            className="register-form"
                            scrollToFirstError
                            onFinish={handleSaveRegister}
                        >
                            <Form.Item
                                name="TV_EMAIL"
                                label="E-mail"
                                rules={[
                                    {
                                        type: "email",
                                        message: "Vui lòng nhập đúng định dạng email",
                                    },
                                    {
                                        required: true,
                                        message: "Email không được bỏ trống",
                                    }
                                ]}
                            >
                                <Input placeholder='Email' />

                            </Form.Item>
                            <Form.Item
                                name="MATKHAU"
                                label="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Mật khẩu không được bỏ trống",
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
                                name="TV_COMFIRMPASSWORD"
                                label="Xác nhận mật khẩu"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Mật khẩu không được bỏ trống",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('MATKHAU') === value) {
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
                                name="TV_HOTEN"
                                label="Họ tên"
                                rules={[
                                    {
                                        required: true,
                                        message: "Họ tên không được bỏ trống",
                                    }
                                ]}
                            >
                                <Input placeholder='Họ tên' />
                            </Form.Item>
                            <Form.Item label="Giới tính" name="TV_GIOITINH">
                                <Select options={[{ value: 'Nam', labe: 'Nam' }, { value: 'Nữ', labe: 'Nữ' }]} />
                            </Form.Item>
                            <Form.Item
                                name="TV_SODIENTHOAI"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: "Số điện thoại không được bỏ trống"
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
                                name="TV_DIACHI"
                                label="Địa chỉ"
                                rules={[
                                    {
                                        required: true,
                                        message: "Địa chỉ không được bỏ trống"
                                    },
                                ]}
                            >
                                <Input placeholder='Địa chỉ' />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" block loading={isLoading}>
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