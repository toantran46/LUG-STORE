import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { Drawer, Input, Tooltip } from 'antd';
import { ShoppingFilled, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import ModelLogin from 'components/ModelLogin';

Header.propTypes = {
};
const { Search } = Input;

function Header(props) {
    return (
        <div className="header">
            <div className="test">
                <div className="header-contact">
                    <div className="left">
                        <span><b>1800 6646 </b>(miễn phí) - Giao hàng toàn quốc</span>
                    </div>
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
                    <Link to="">
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