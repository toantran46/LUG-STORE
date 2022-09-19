import React from 'react';
import PropTypes from 'prop-types';
import "./Admin.scss";
import SideBar from './pages/SideBar';
import { Route, Routes } from 'react-router-dom';
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

Admin.propTypes = {

};

function Admin(props) {
    return (
        <div className="admin">
            <Header />
            <div className='layout'>
                <SideBar />
                <div className="pages">
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
                    </Routes>
                </div>
            </div >
        </div>
    );
}

export default Admin;