import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Dashboard', '1', <Link to={'/admin/dashboard'}><MailOutlined /></Link>),
    getItem('Sản phẩm', '2', <Link to={'/admin/product'}><AppstoreOutlined /> </Link>),
    getItem('Đơn đặt hàng', '3', <Link to={'/admin/order'}><AppstoreOutlined /> </Link>),
    getItem('Thành viên', '4', <Link to={'/admin/member'}><AppstoreOutlined /> </Link>),
    getItem('Nhân viên', '5', <Link to={'/admin/employee'}><AppstoreOutlined /> </Link>),
    getItem('Chức vụ', '6', <Link to={'/admin/regency'}><AppstoreOutlined /> </Link>),
    getItem('Loại sản phẩm', '8', <Link to={'/admin/product-type'}><AppstoreOutlined /> </Link>),
    getItem('Thương hiệu', '9', <Link to={'/admin/brand'}><AppstoreOutlined /> </Link>),
    getItem('Khuyến mãi', '10', <Link to={'/admin/discount'}><AppstoreOutlined /> </Link>),
    getItem('Màu sắc', '11', <Link to={'/admin/color'}><AppstoreOutlined /> </Link>),
    getItem('Nhà cung cấp', '13', <Link to={'/admin/supplier'}><AppstoreOutlined /> </Link>),
    // getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    //     getItem('Option 9', '9'),
    //     getItem('Option 10', '10'),
    //     getItem('Option 11', '11'),
    //     getItem('Option 12', '12'),
    // ]),
];

function SideBar(props) {

    const [current, setCurrent] = React.useState('1');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div className="sidebar">
            <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                // defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default SideBar;