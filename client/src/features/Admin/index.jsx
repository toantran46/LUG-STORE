import React from 'react';
import PropTypes from 'prop-types';
import "./Admin.scss";
import SideBar from './pages/SideBar';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashBoard from './pages/DashBoard';
import Product from './pages/Product';
import Order from './pages/Order';
import Header from './components/Header';
import ProductType from './pages/ProductType';
import Brand from './pages/Brand';
import Discount from './pages/Discount';
import Supplier from './pages/Supplier';
import Regency from './pages/Regency';
import Employee from './pages/Employee';
import Member from './pages/Member';
import Color from './pages/Color';
import { fetch_brands, fetch_colors, fetch_discounts, fetch_employees, fetch_goodsrecipi, fetch_members, fetch_orders, fetch_order_undo, fetch_products, fetch_product_types, fetch_regencys, fetch_suppliers, fetch_thongkes } from './adminSlice';
import GoodsRecipi from './pages/GoodsRecipi';

Admin.propTypes = {

};

function Admin(props) {
    const {
        pagination } = useSelector(state => state.adminInfo);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetch_brands({ _limit: pagination.brands._limit, _page: pagination.brands._page }));
    }, [pagination.brands])
    React.useEffect(() => {
        dispatch(fetch_regencys({ _limit: pagination.regencys._limit, _page: pagination.regencys._page }));
    }, [pagination.regencys])
    React.useEffect(() => {
        dispatch(fetch_product_types({ _limit: pagination.product_types._limit, _page: pagination.product_types._page }));
    }, [pagination.product_types])
    React.useEffect(() => {
        dispatch(fetch_suppliers({ _limit: pagination.suppliers._limit, _page: pagination.suppliers._page }));
    }, [pagination.suppliers])
    React.useEffect(() => {
        dispatch(fetch_discounts({ _limit: pagination.discounts._limit, _page: pagination.discounts._page }));
    }, [pagination.discounts])
    React.useEffect(() => {
        dispatch(fetch_colors({ _limit: pagination.colors._limit, _page: pagination.colors._page }));
    }, [pagination.colors])
    React.useEffect(() => {
        dispatch(fetch_employees({ _limit: pagination.employees._limit, _page: pagination.employees._page }));
    }, [pagination.employees])
    React.useEffect(() => {
        dispatch(fetch_members({ _limit: pagination.members._limit, _page: pagination.members._page }));
    }, [pagination.members])
    React.useEffect(() => {
        dispatch(fetch_products({ _limit: pagination.products._limit, _page: pagination.products._page }));
    }, [pagination.products])
    React.useEffect(() => {
        dispatch(fetch_orders({ _limit: pagination.orders._limit, _page: pagination.orders._page }));
    }, [pagination.orders])
    React.useEffect(() => {
        dispatch(fetch_goodsrecipi({ _limit: pagination.goodsrecipi._limit, _page: pagination.goodsrecipi._page }));
    }, [pagination.goodsrecipi])
    React.useEffect(() => {
        dispatch(fetch_order_undo({ status: 1 }));
    }, [pagination.orders])
    React.useEffect(() => {
        dispatch(fetch_thongkes());
    }, [])
    const { user } = useSelector(state => state.auth)
    // console.log(user);
    return (
        <div className="admin">
            <Header />
            <div className='layout'>
                <SideBar />
                <div className="pages">
                    {user?.CV_KEY == 0 ?
                        <Routes>
                            <Route index path='dashboard' element={<DashBoard />}></Route>
                            <Route path='product' element={<Product />}></Route>
                            <Route path='order' element={<Order />}></Route>
                            <Route path='product-type' element={<ProductType />}></Route>
                            <Route path='brand' element={<Brand />}></Route>
                            <Route path='discount' element={<Discount />}></Route>
                            <Route path='supplier' element={<Supplier />}></Route>
                            <Route path='regency' element={<Regency />}></Route>
                            <Route path='employee' element={<Employee />}></Route>
                            <Route path='member' element={<Member />}></Route>
                            <Route path='color' element={<Color />}></Route>
                            <Route path='goodsrecipi' element={<GoodsRecipi />}></Route>
                        </Routes>
                        : user?.CV_KEY == 1 ?
                            <Routes>
                                <Route path='product' element={<Product />}></Route>
                                <Route path='product-type' element={<ProductType />}></Route>
                                <Route path='brand' element={<Brand />}></Route>
                                <Route path='supplier' element={<Supplier />}></Route>
                                <Route path='color' element={<Color />}></Route>
                                <Route path='goodsrecipi' element={<GoodsRecipi />}></Route>
                            </Routes>
                            : user?.CV_KEY == 3 ?
                                <Routes>
                                    <Route path='order' element={<Order />}></Route>
                                </Routes>
                                : user?.CV_KEY == 4 ?
                                    <Routes>
                                        <Route path='employee' element={<Employee />}></Route>
                                        <Route path='member' element={<Member />}></Route>
                                        <Route path='order' element={<Order />}></Route>
                                    </Routes>
                                    : ''}
                </div>
            </div >
        </div>
    );
}

export default Admin;