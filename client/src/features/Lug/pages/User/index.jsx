import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import "./User.scss";
import { Tabs } from 'antd';
import UserInfo from 'features/Lug/components/UserInfo/indes';
import OrderHistory from 'features/Lug/components/OrderHistory';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetch_order, fetch_wishlist } from 'features/Lug/userSlice';
import WishList from 'features/Lug/components/WishList';
User.propTypes = {

};

function User(props) {
    const { state } = useLocation()
    const [currentTab, setCurrentTab] = React.useState();
    const { user } = useSelector(state => state.auth)
    console.log(user)
    const dispatch = useDispatch();
    const {
        pagination } = useSelector(state => state.userInfo);
    // console.log(pagination);
    React.useEffect(() => {
        dispatch(fetch_order({ _limit: pagination.order._limit, _page: pagination.order._page, action: 'get_order', TV_ID: user?.TV_ID }));
    }, [pagination.order, user?.TV_ID])
    React.useEffect(() => {
        setCurrentTab(state.tab || '1')
    }, [state])
    return (
        <div className='user'>
            <Header />
            <div className="container">
                <Tabs
                    onChange={(tab) => setCurrentTab(tab)}
                    activeKey={currentTab}
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
                        <WishList />
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <Footer />
        </div>
    );
}

export default User;