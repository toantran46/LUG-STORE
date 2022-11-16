import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './Cart.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Empty, Input } from 'antd';
import { ArrowLeftOutlined, CreditCardOutlined, DeleteFilled, DropboxOutlined, RollbackOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'assets/global/FormatMoney';
import { changeQuantityCart, removeCart, showLogin } from 'features/Lug/userSlice';
import { toastError } from 'utils/notification';

Cart.propTypes = {

};

function Cart(props) {
    const { cart } = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isAuth } = useSelector(state => state.auth);
    console.log(cart);
    const handleClickPayment = () => {
        if (!isAuth) {
            return dispatch(showLogin(true))
        }
        if (cart.length > 0) {
            navigate('/payment')
        } else {
            toastError('Giỏ hàng trống, vui lòng mua sắm thêm')
        }
    }
    return (
        <div className='cart'>
            <Header />
            <div className="container">
                <div className="head-title">
                    <h1>GIỎ HÀNG</h1>
                </div>
                <table className='table'>
                    <tbody>
                        <tr className='heading'>
                            <th>Sản Phẩm</th>
                            <th>Màu</th>
                            <th>Đơn Giá</th>
                            <th>Số Lượng</th>
                            <th>Tổng</th>
                            <th></th>
                        </tr>
                        {
                            cart.length > 0 ? cart.map((data) =>
                                <tr className='cart-detail'>
                                    <td className='item-image'>
                                        <Link to=''>
                                            <img src={data.ANHSP} alt="" />
                                        </Link>
                                        <div className="info">
                                            <Link to=""><div className="name">{data.SP_TEN}</div></Link>
                                            <div className="brand">
                                                <Link to=''>{data.TH_TENTHUONGHIEU}</Link></div>
                                        </div>
                                    </td>
                                    <td className='item-color'>
                                        <span style={{ backgroundColor: `${data.TENMAU}` }} className='swatch-color'></span>
                                    </td>
                                    <td className='item-price'>
                                        {
                                            data.SP_GIABAN ?
                                                <div>
                                                    <span className='standar'>{format(data?.SP_GIAGOC)}₫</span>
                                                    <span className='discounted'>{format(data?.SP_GIABAN)}₫</span>
                                                </div>
                                                : <span className='discounted'>{format(data?.SP_GIAGOC)}₫</span>
                                        }
                                    </td>
                                    <td className='item-quantity'>
                                        <Button onClick={() => dispatch(changeQuantityCart({ id: data.SP_MA, quantity: -1, mamau: data.MAMAU }))} disabled={data.SL_SP < 2} >-</Button>
                                        <Col span={3}>
                                            <Input value={data.SL_SP} />
                                        </Col>
                                        <Button onClick={() => dispatch(changeQuantityCart({ id: data.SP_MA, quantity: 1, mamau: data.MAMAU }))} disabled={data.SL_SP == data.SOLUONGKHO}>+</Button>
                                    </td>
                                    <td className='item-total'>
                                        <span className='discounted'>{format(data.SL_SP * (data.SP_GIABAN || data.SP_GIAGOC))}₫</span>
                                    </td>
                                    <td colSpan={0.2} className='item-delete'>
                                        <span onClick={() => dispatch(removeCart({ id: data.SP_MA, mamau: data.MAMAU }))} ><DeleteFilled /></span>
                                    </td>
                                </tr>
                            ) :
                                <tr>
                                    <td colSpan={6}>
                                        <Empty description={
                                            <span>Chưa có sản phẩm trong giỏ hàng</span>
                                        } >
                                        </Empty>
                                    </td>
                                </tr>

                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={4} className="ship">
                                <div className="banner-ship">
                                    <div className="free-ship">
                                        <DropboxOutlined />
                                        <span>Miễn phí giao hàng toàn quốc</span>
                                    </div>
                                    <div className="assurance">
                                        <CreditCardOutlined />
                                        <span>100% bảo mật thanh toán</span>
                                    </div>
                                </div>
                                <div className="home-back">
                                    <Link to="/"><ArrowLeftOutlined /> Tiếp tục mua hàng</Link>
                                </div>
                            </td>
                            <td colSpan={2} className='totals' >
                                <div className="title">
                                    <span className='title'>Tổng tiền: </span>
                                    <span className='price'>{format(cart?.reduce((a, b) => a + b.SL_SP * (b.SP_GIABAN || b.SP_GIAGOC), 0))}₫</span>
                                </div>
                                <button onClick={handleClickPayment} disabled={cart.length > 0 ? false : true} className='btn btn-danger btn-block'>TIẾN HÀNH THANH TOÁN</button>

                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;