import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'antd';
import './Footer.scss';
import { FacebookOutlined, YoutubeOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
Footer.propTypes = {

};

function Footer(props) {
    return (
        <div className='footer'>
            <div className="footer__footer-wrapper">
                <div className="footer__footer-wrapper__on-top">
                    <ul className='banner-list'>
                        <li className="banner-item">
                            <div className="item">
                                <img src="https://bizweb.dktcdn.net/100/349/716/files/giao-hang.svg?v=1571638586897" alt="" />
                                <span>Giao hàng </span>
                                <span>toàn quốc</span>
                            </div>
                        </li>
                        <li className="banner-item">
                            <div className="item">
                                <img src="https://bizweb.dktcdn.net/100/349/716/files/thanh-toan-01.svg?v=1571638586897" alt="" />
                                <span>Thanh toán </span>
                                <span>an toàn 100%</span>
                            </div>
                        </li>
                        <li className="banner-item">
                            <div className="item">
                                <img src="https://bizweb.dktcdn.net/100/349/716/files/bao-hanh-5-nam-01.svg?v=1571638586893" alt="" />
                                <span>Bảo hành </span>
                                <span>từ 5 năm</span>
                            </div>
                        </li>
                        <li className="banner-item">
                            <div className="item">
                                <img src="https://bizweb.dktcdn.net/100/349/716/files/cskh.svg?v=1571640602993" alt="" />
                                <span>Chăm sóc khách hàng </span>
                                <span>1800 0088 (miễn phí)</span>
                            </div>
                        </li>
                        <li className="banner-item">
                            <div className="item">
                                <img src="https://bizweb.dktcdn.net/100/349/716/files/phan-phoi-doc-quyen-4b9cbf82-b707-4dde-a9dc-7af82bbd4c19.svg?v=1571638586897" alt="" />
                                <span>Phân phối </span>
                                <span>độc quyền</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="footer__footer-wrapper__on-bottom">
                    <Row className='infor-wrapper'>
                        <Col className='infor' span={6}>
                            <div className='infor-list'>
                                <div className='logo'>
                                    <img src="https://bizweb.sapocdn.net/100/349/716/themes/849865/assets/lug-white.svg?1661144560959" alt="" />
                                </div>
                                <div className='address'>
                                    <div className="detail">
                                        <p>Công Ty TNHH Sáng Tâm</p>
                                        <p>Đc: 1 Lý Tự Trọng, phường An Phú quận Ninh Kiều TPCT</p>
                                    </div>
                                </div>
                                <div className='social'>
                                    <span>KẾT NỐI VỚI CHÚNG TÔI</span>
                                    <ul>
                                        <li>
                                            <a href="faebook.com" title='Go to Facebook'>
                                                <FacebookOutlined />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="youtube.com" title='Go to Youtube'>
                                                <YoutubeOutlined />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="instagram.com" title='Go to Instagram'>
                                                <InstagramOutlined />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="zalo.com" title='Contact to us'>
                                                <PhoneOutlined />
                                            </a>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </Col>
                        <Col className='about-us' span={6}>
                            <span>VỀ CHÚNG TÔI</span>
                            <div className="infor">
                                <a href="">Giới thiệu về LUG</a>
                            </div>
                            <div className="infor">
                                <a href="">Tuyển dụng</a>
                            </div>
                            <div className="infor">
                                <a href="">Cửa hàng</a>
                            </div>
                        </Col>
                        <Col className='help-us' span={6}>
                            <span>HỖ TRỢ KHÁCH HÀNG</span>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </Col>
                        <Col className='discount-inform' span={6}>
                            <span>ĐĂNG KÍ ĐỂ NHẬN THÔNG TIN KHUYẾN MÃI</span>
                            <ul>
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        </div >
    );
}

export default Footer;