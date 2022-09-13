import React from 'react';
import PropTypes from 'prop-types';
import "./PaymentMethod.scss";
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Radio, Space } from 'antd';

PaymentMethod.propTypes = {

};

function PaymentMethod(props) {
    return (
        <div className='payment-method'>
            <h5>Đơn hàng (2 sản phẩm)</h5>
            <div className="product-content">
                <div className="product-content__img">
                    <div className="img-wrapper">
                        <div className="img-quantity">
                            <img width={70} height={70} src="https://bizweb.sapocdn.net/100/349/716/products/8689-grey-18-s-square-1.jpg?v=1660807558793" alt="" />
                        </div>
                        <span className='quantity'>1</span>
                    </div>
                    <div className="detail">
                        <div className="name-product">
                            Balo Cavalli 6868
                        </div>
                        <div className="color-product">
                            GREY
                        </div>
                    </div>
                </div>
                <div className="product-content__price">
                    <span>1.290.000₫</span>
                </div>
            </div>
            <div className="product-content">
                <div className="product-content__img">
                    <div className="img-wrapper">
                        <div className="img-quantity">
                            <img width={70} height={70} src="https://bizweb.sapocdn.net/100/349/716/products/8689-grey-18-s-square-1.jpg?v=1660807558793" alt="" />
                        </div>
                        <span className='quantity'>1</span>
                    </div>
                    <div className="detail">
                        <div className="name-product">
                            Balo Cavalli 6868
                        </div>
                        <div className="color-product">
                            GREY
                        </div>
                    </div>
                </div>
                <div className="product-content__price">
                    <span>1.290.000₫</span>
                </div>
            </div>

            <div className="temp-price">
                <div className="total-line">
                    <div className="line-name">
                        Tạm tính
                    </div>
                    <div className="price">
                        1.290.000₫
                    </div>
                </div>
                <div className="ship-line">
                    <div className="line-name">
                        Phí vận chuyển
                    </div>
                    <div className="price">
                        Miễn phí
                    </div>
                </div>
                <div className="payment-line">
                    <div className="line-name">
                        Phương thức thanh toán
                    </div>
                    <div className="method">
                        <Radio.Group defaultValue={1}>
                            <Space direction="vertical">
                                <Radio checked value={1}>Thanh toán khi nhận hàng</Radio>
                                <Radio value={2}>Thanh toán qua ví điện tử Momo</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>
                <div className="total-price">
                    <div className="line-name">
                        Tổng cộng
                    </div>
                    <div className="line-price">
                        2.180.000₫
                    </div>
                </div>
                <div className="order-line">
                    <div className="cart-back">
                        <Link to={"/cart"}>
                            <span><LeftOutlined /></span>Quay về giỏ hàng
                        </Link>
                    </div>
                    <div className="btn-order">
                        <Button type="primary" size='large' danger>Đặt hàng</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PaymentMethod;