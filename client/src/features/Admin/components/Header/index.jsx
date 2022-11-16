import React from 'react';
import PropTypes from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';
import './Header.scss';
import { Link } from 'react-router-dom';
import { Avatar, Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'app/authSlice';

Header.propTypes = {

};

function Header(props) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    return (
        <div className='head'>
            <div className="logo">
                <Link to={'/'}>
                    <img width={150} src="https://bizweb.dktcdn.net/100/349/716/files/lug.svg?v=1645757332903" alt="" />
                </Link>
            </div>
            <div className="log-out">
                <Space>
                    <div className="avatar">
                        <p style={{ fontSize: '17px', color: '#1890FF', fontWeight: '500' }}>{user?.NV_HOTEN}</p>
                    </div>
                </Space>
                <span className='icon-logout'>
                    <Button type='danger' onClick={() => dispatch(logout())}>Đăng xuất <LogoutOutlined /></Button>
                </span>

            </div>
        </div>
    );
}

export default Header;