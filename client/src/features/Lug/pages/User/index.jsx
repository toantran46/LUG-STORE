import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import "./User.scss";
import { Tabs } from 'antd';
import UserInfo from 'features/Lug/components/UserInfo/indes';
import OrderHistory from 'features/Lug/components/OrderHistory';
User.propTypes = {

};

function User(props) {
    return (
        <div className='user'>
            <Header />
            <div className="container">
                <Tabs
                    defaultActiveKey="1"
                    tabPosition='left'
                >
                    <Tabs.TabPane tab="> Thông tin cá nhân" key="1">
                        <div className="info-user">
                            <UserInfo />
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="> Lịch sử mua hàng" key="2">
                        <OrderHistory />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="> Sản phẩm yêu thích" key="3">
                        <OrderHistory />
                    </Tabs.TabPane>
                </Tabs>

            </div>
            <Footer />
        </div>
    );
}

export default User;