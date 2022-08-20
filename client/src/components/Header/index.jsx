import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { Button, Input, Tooltip } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

Header.propTypes = {
};
const { Search } = Input;

function Header(props) {
    return (
        <div className="header">
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
                                <Link to="">BALO</Link>
                            </li>
                            <li>
                                <Link to="">TÚI XÁCH</Link>
                            </li>
                            <li>
                                <Link to="">GÓC DU LỊCH</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="header-container__top-right">
                    <div className="search">
                        <Search placeholder='Bạn cần tìm sản phẩm gì?' />
                    </div>
                    <div className="login">
                        <Link to="">
                            ĐĂNG NHẬP
                        </Link>
                    </div>
                    <div className="cart">
                        <Link to="">
                            <Tooltip color="orange" title="Xem giỏ hàng">
                                <ShoppingCartOutlined />
                            </Tooltip>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Header;