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
import { Navigate, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import Map from './pages/Map';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from 'app/authSlice';
import ModelLogin from 'components/ModelLogin';
import { toastError, toastSucsess } from 'utils/notification';
import { donhangApi } from 'api/donhangApi';
import { fetch_wishlist, resetCart } from './userSlice';
import PaymentSuccess from './pages/PaymentSuccess';

Lug.propTypes = {

};

function Lug(props) {
    const dispatch = useDispatch();
    const { token, user } = useSelector(state => state.auth);
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const {
        pagination } = useSelector(state => state.userInfo);
    // console.log(urlParam)
    React.useEffect(() => {
        dispatch(fetch_wishlist({ _limit: pagination.wishlist._limit, _page: pagination.wishlist._page, action: 'get_wishlist' }));
    }, [pagination.wishlist, user?.TV_ID])
    React.useEffect(() => {
        token && dispatch(getMe())
        // console.log(user)
    }, [token])
    if (user?.NV_ID) navigate('/admin/dashboard')
    React.useEffect(() => {
        const redirectTo = searchParams.get('redirectto')
        const extraData = searchParams.get('extraData');
        const resultCode = searchParams.get('resultCode');
        if (redirectTo && user) {
            if (resultCode != 0) {
                toastError('Thanh toán thất bại, xin mời thử lại')
            } else {
                (async () => {
                    try {
                        const data = {
                            isMomoPayment: true,
                            data: extraData
                        }
                        const { message } = await donhangApi.post(data)
                        toastSucsess(message);
                        dispatch(resetCart());
                        //redirect to orderhistory { state: { tab: '2' } }
                        navigate(redirectTo);
                        setSearchParams(null);
                    } catch (error) {
                        console.log(error)
                    }
                })()
            }
        }
    }, [user])

    return (

        <div>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="user" element={user?.TV_ID ? <User /> : <Navigate to={'/'} />} />
                <Route path="category" element={<Bags />} />
                <Route path="products">
                    <Route path=':IDsanpham' element={<ProductDetail ></ProductDetail>} />
                </Route>
                <Route path="cart" element={<Cart />} />
                <Route path="payment" element={user?.TV_ID ? <Payment /> : <Navigate to={'/'} />} />
                <Route path="payment/success" element={user?.TV_ID ? <PaymentSuccess /> : <Navigate to={'/'} />} />
                <Route path="map" element={<Map />} />
            </Routes>
        </div>
    );
}

export default Lug;