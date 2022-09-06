import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from 'components/BreadCrumb';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SwiperCustom from 'features/Home/components/SwiperCustom';
import { SwiperSlide } from 'swiper/react';
import './ProductDetail.scss';
import ProductWisper from 'features/Home/components/ProductSwiper';
import SlidePicture from './components/SlidePicture';
import { Col, Row } from 'antd';
import ProductInfo from './components/ProductInfo';
import Specification from './components/Specification';
import CommentNRate from './components/CommentNRate';

ProductDetail.propTypes = {

};

function ProductDetail(props) {
    return (
        <div className='product-detail'>
            <Header />
            <BreadCrumb />
            <div className="container">
                <Row>
                    <Col xs={32} sm={24} md={12} lg={8} >
                        <SlidePicture />
                    </Col>
                    <Col xs={32} sm={24} md={12} lg={8} >
                        <ProductInfo />
                    </Col>
                    <Col xs={32} sm={24} md={16} lg={8} >
                        <Specification />
                    </Col>
                </Row>
                <CommentNRate />
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetail;