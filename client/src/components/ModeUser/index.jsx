import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, Menu, Space } from 'antd';
import { CameraOutlined, DownOutlined, HeartOutlined, HistoryOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "./ModeUser.scss";

ModeUser.propTypes = {

};

const menu = (
    <Menu
        items={[
            {
                label: (
                    <Link to="/user" >
                        <UserOutlined /> Thông tin cá nhân
                    </Link>
                ),
                key: '0',
            },
            {
                label: (
                    <Link to="/user" >
                        <HistoryOutlined /> Lịch sử mua hàng
                    </Link>
                ),
                key: '1',
            },
            {
                label: (
                    <Link to="/user" >
                        <HeartOutlined /> Sản phẩm yêu thích
                    </Link>
                ),
                key: '2',
            },
            {
                label: (
                    <Link to="">
                        <LogoutOutlined /> Đăng xuất
                    </Link>
                ),
                key: '3',
            },
        ]}
    />
);

function ModeUser(props) {
    return (
        <div className='mode-user'>
            <Dropdown
                overlay={menu}
                trigger={['click']}
                placement="bottom"
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <div className="avatar">
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                        </div>
                        Trần Trọng Toàn
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
}

export default ModeUser;