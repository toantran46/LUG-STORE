import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Home from './pages/Home';
import Bags from './pages/Bags';
import User from './pages/User';
import Lugs from './pages/Lugs';
import Accessories from './pages/Accessories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import { Navigate, Route, Routes } from 'react-router-dom';
import Map from './pages/Map';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from 'app/authSlice';

Lug.propTypes = {

};

function Lug(props) {
    const dispatch = useDispatch();
    const { token, user } = useSelector(state => state.auth);
    // console.log(user)
    React.useEffect(() => {
        token && dispatch(getMe())
    }, [token])
    return (
        <div>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="bags" element={<Bags />} />
                <Route path="user" element={user?.TV_ID ? <User /> : <Navigate to={'/'} />} />
                <Route path="lugs" element={<Lugs />} />
                <Route path="accessories" element={<Accessories />} />
                <Route path="products">
                    <Route path=':idProduct' element={<ProductDetail ></ProductDetail>} />
                </Route>
                <Route path="cart" element={<Cart />} />
                <Route path="payment" element={user?.TV_ID ? <Payment /> : <Navigate to={'/'} />} />
                <Route path="map" element={<Map />} />
            </Routes>
        </div>
    );
}

export default Lug;