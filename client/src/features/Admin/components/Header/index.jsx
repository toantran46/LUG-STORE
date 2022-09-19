import React from 'react';
import PropTypes from 'prop-types';
import { LogoutOutlined } from '@ant-design/icons';
import './Header.scss';
import { Link } from 'react-router-dom';
import { Avatar, Space } from 'antd';

Header.propTypes = {

};

function Header(props) {
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
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </div>
                </Space>
                <span className='icon-logout'>
                    Đăng xuất
                </span>

            </div>
        </div>
    );
}

export default Header;