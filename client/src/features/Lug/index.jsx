import React from 'react';
import PropTypes from 'prop-types';
import Home from './pages/Home';
import Bags from './pages/Bags';
import User from './pages/User';
import Lugs from './pages/Lugs';
import Accessories from './pages/Accessories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import { Route, Routes } from 'react-router-dom';
import Map from './pages/Map';

Lug.propTypes = {

};

function Lug(props) {
    return (
        <div>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="bags" element={<Bags />} />
                <Route path="user" element={<User />} />
                <Route path="lugs" element={<Lugs />} />
                <Route path="accessories" element={<Accessories />} />
                <Route path="products">
                    <Route path=':idProduct' element={<ProductDetail />} />
                </Route>
                <Route path="cart" element={<Cart />} />
                <Route path="payment" element={<Payment />} />
                <Route path="map" element={<Map />} />
            </Routes>
        </div>
    );
}

export default Lug;