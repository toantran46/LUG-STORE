import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { Avatar, Dropdown, Input, Menu, Space, Tooltip } from 'antd';
import { ShoppingFilled, SearchOutlined, EnvironmentOutlined, DownOutlined, HeartOutlined, HistoryOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import ModelLogin from 'components/ModelLogin';
import ModeUser from 'components/ModeUser';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'app/authSlice';

Header.propTypes = {
};
const { Search } = Input;

function Header(props) {
    const dispatch = useDispatch();

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <Link to="/user" state={{ tab: '1', }} >
                            <UserOutlined /> Thông tin cá nhân
                        </Link>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <Link to="/user" state={{ tab: '2', }} >
                            <HistoryOutlined /> Lịch sử mua hàng
                        </Link>
                    ),
                    key: '1',
                },
                {
                    label: (
                        <Link to="/user" state={{ tab: '3', }} >
                            <HeartOutlined /> Sản phẩm yêu thích
                        </Link>
                    ),
                    key: '2',
                },
                {
                    label: (
                        <div onClick={() => dispatch(logout())}>
                            <LogoutOutlined /> Đăng xuất
                        </div>
                    ),
                    key: '3',
                },
            ]}
        />
    );
    const { user, isAuth } = useSelector(state => state.auth);

    return (
        <div className="header">
            <div className="test">
                <div className="header-contact">
                    <div className="left">
                        <span><b>1800 6868 </b>(miễn phí) - Giao hàng toàn quốc</span>
                    </div>
                    {isAuth ?
                        <div className="mode-user">
                            <Dropdown
                                overlay={menu}
                                trigger={['click']}
                                placement="bottom"
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <div className="avatar">
                                            <Avatar src={user?.TV_AVATAR || "https://joeschmoe.io/api/v1/random"} />
                                        </div>
                                        {user?.TV_HOTEN}
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>

                        :
                        <ModelLogin />
                    }

                </div>
            </div>

            <div className='header-container'>
                <div className="header-container__top-left">
                    <div className="logo">
                        <Link to="/">
                            <img src="https://bizweb.dktcdn.net/100/349/716/files/lug.svg?v=1645757332903" />
                        </Link>
                    </div>
                    <div className="menu">
                        <ul>
                            <li>
                                <Link to="/bags">BALO</Link>
                            </li>
                            <li>
                                <Link to="/lugs">TÚI XÁCH</Link>
                            </li>
                            <li>
                                <Link to="/accessories">PHỤ KIỆN</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="header-container__top-right">
                    <div className="search">
                        <Input placeholder='Bạn cần tìm sản phẩm gì?' onSubmit={null} />
                        <div className="search-icon">
                            <SearchOutlined />
                        </div>
                    </div>
                    <Link to="/map">
                        <div className='map'>
                            <EnvironmentOutlined />
                        </div>
                    </Link>
                    <div className="cart">
                        <Link to="/cart">
                            <Tooltip placement="bottom" color="red" title="Xem giỏ hàng">
                                <div className="custom-cart">
                                    <div className="count-cart">
                                        <span>9</span>
                                    </div>
                                    <ShoppingFilled />
                                </div>
                            </Tooltip>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Header;