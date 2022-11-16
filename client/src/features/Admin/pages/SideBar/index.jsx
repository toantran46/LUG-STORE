import React from 'react';
import PropTypes from 'prop-types';
import './SideBar.scss';
import { Link } from 'react-router-dom';
import { AppstoreOutlined, AuditOutlined, BgColorsOutlined, ClusterOutlined, CrownOutlined, DashboardOutlined, DropboxOutlined, MailOutlined, SettingOutlined, ShoppingOutlined, TagsOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


function SideBar(props) {
    const [current, setCurrent] = React.useState('1');
    const [data, setData] = React.useState();
    const { user } = useSelector(state => state.auth)
    // console.log(user);
    React.useEffect(() => {
        if (user?.CV_KEY == 0) {
            setData([
                getItem('Dashboard', '1', <Link to={'/admin/dashboard'}><DashboardOutlined /></Link>),
                getItem('Sản phẩm', '2', <Link to={'/admin/product'}><DropboxOutlined /> </Link>),
                getItem('Đơn đặt hàng', '3', <Link to={'/admin/order'}><ShoppingOutlined /> </Link>),
                getItem('Thành viên', '4', <Link to={'/admin/member'}><UserOutlined /> </Link>),
                getItem('Nhân viên', '5', <Link to={'/admin/employee'}><TeamOutlined /> </Link>),
                getItem('Chức vụ', '6', <Link to={'/admin/regency'}><AuditOutlined /></Link>),
                getItem('Nhập hàng', '7', <Link to={'/admin/goodsrecipi'}><AuditOutlined /></Link>),
                getItem('Loại sản phẩm', '8', <Link to={'/admin/product-type'}><UnorderedListOutlined /> </Link>),
                getItem('Thương hiệu', '9', <Link to={'/admin/brand'}><CrownOutlined /> </Link>),
                getItem('Khuyến mãi', '10', <Link to={'/admin/discount'}><TagsOutlined /> </Link>),
                getItem('Màu sắc', '11', <Link to={'/admin/color'}><BgColorsOutlined /> </Link>),
                getItem('Nhà cung cấp', '12', <Link to={'/admin/supplier'}><ClusterOutlined /> </Link>),
            ])
        } else if (user?.CV_KEY == 1) {
            setData([
                getItem('Sản phẩm', '2', <Link to={'/admin/product'}><DropboxOutlined /> </Link>),
                getItem('Nhập hàng', '7', <Link to={'/admin/goodsrecipi'}><AuditOutlined /></Link>),
                getItem('Loại sản phẩm', '8', <Link to={'/admin/product-type'}><UnorderedListOutlined /> </Link>),
                getItem('Thương hiệu', '9', <Link to={'/admin/brand'}><CrownOutlined /> </Link>),
                getItem('Màu sắc', '11', <Link to={'/admin/color'}><BgColorsOutlined /> </Link>),
                getItem('Nhà cung cấp', '12', <Link to={'/admin/supplier'}><ClusterOutlined /> </Link>),
            ])
        } else if (user?.CV_KEY == 3) {
            setData([
                getItem('Đơn đặt hàng', '3', <Link to={'/admin/order'}><ShoppingOutlined /> </Link>),
            ])
        } else if (user?.CV_KEY == 4) {
            setData([
                getItem('Thành viên', '4', <Link to={'/admin/member'}><UserOutlined /> </Link>),
                getItem('Nhân viên', '5', <Link to={'/admin/employee'}><TeamOutlined /> </Link>),
                getItem('Đơn đặt hàng', '3', <Link to={'/admin/order'}><ShoppingOutlined /> </Link>),
            ])
        }
    }, [user])

    const onClick = (e) => {
        // console.log('click ', e);
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
                items={data}
            />
        </div>
    );
}

export default SideBar;