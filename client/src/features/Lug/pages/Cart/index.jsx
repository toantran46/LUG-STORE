import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './Cart.scss';
import { Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import { ArrowLeftOutlined, CreditCardOutlined, DeleteFilled, DropboxOutlined, RollbackOutlined } from '@ant-design/icons';

Cart.propTypes = {

};

function Cart(props) {
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
                        <tr className='cart-detail'>
                            <td className='item-image'>
                                <Link to=''>
                                    <img src="https://bizweb.sapocdn.net/100/349/716/products/8689-grey-18-s-square-1.jpg?v=1660807558793" alt="" />
                                </Link>
                                <div className="info">
                                    <Link to=""><div className="name">BALO CAVALLI 6868</div></Link>
                                    <div className="brand">
                                        <Link to=''>Bruno Cavalli</Link></div>
                                </div>
                            </td>
                            <td className='item-color'>
                                <span style={{ backgroundColor: 'red' }} className='swatch-color'></span>
                            </td>
                            <td className='item-price'>
                                <span className='discounted'>1.290.000₫</span>
                                <span className='standar'>1.842.857₫</span>
                            </td>
                            <td className='item-quantity'>
                                <Button>-</Button>
                                <Button disabled>1</Button>
                                <Button>+</Button>
                            </td>
                            <td className='item-total'>
                                <span className='discounted'>1.290.000₫</span>
                            </td>
                            <td colSpan={0.2} className='item-delete'>
                                <span><DeleteFilled /></span>
                            </td>
                        </tr>
                        <tr className='cart-detail'>
                            <td className='item-image'>
                                <Link to=''>
                                    <img src="https://bizweb.sapocdn.net/100/349/716/products/8689-grey-18-s-square-1.jpg?v=1660807558793" alt="" />
                                </Link>
                                <div className="info">
                                    <Link to=""><div className="name">BALO CAVALLI 6868</div></Link>
                                    <div className="brand">
                                        <Link to=''>Bruno Cavalli</Link></div>
                                </div>
                            </td>
                            <td className='item-color'>
                                <span style={{ backgroundColor: 'red' }} className='swatch-color'></span>
                            </td>
                            <td className='item-price'>
                                <span className='discounted'>1.290.000₫</span>
                                <span className='standar'>1.842.857₫</span>
                            </td>
                            <td className='item-quantity'>
                                <Button>-</Button>
                                <Button disabled>1</Button>
                                <Button>+</Button>
                            </td>
                            <td className='item-total'>
                                <span className='discounted'>1.290.000₫</span>
                            </td>
                            <td colSpan={0.2} className='item-delete'>
                                <span><DeleteFilled /></span>
                            </td>
                        </tr>
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
                                    <span className='price'>2.180.000₫</span>
                                </div>
                                <Link to={'/payment'}><button className='btn btn-danger btn-block'>TIẾN HÀNH THANH TOÁN</button></Link>

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