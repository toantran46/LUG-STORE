import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './ProductSwiper.scss';
import { Link } from 'react-router-dom';

ProductWisper.propTypes = {

};

function ProductWisper(props) {
    return (
        <div className="product-wrapper">
            <div className="product-wrapper__bannerAds">
                <img src="https://bizweb.dktcdn.net/100/349/716/files/label-freeship-plus-plus.png?v=1635739045667" alt="" />
            </div>

            <div className="product-wrapper__salePer">
                <span><b>-60%</b></span>
            </div>
            <div className="product-wrapper__icon">
                <div className="on-hover">
                    <HeartFilled />
                </div>
                <div className="off-hover">
                    <HeartOutlined />
                </div>
            </div>
            <Link to="">
                <img width={200} height={200} src="https://bizweb.sapocdn.net/thumb/large/100/349/716/products/8689-grey-18-s-square-2.jpg?v=1660807558000" alt="" />
                <div className="product-wrapper__product-info">
                    <div className="product-wrapper__product-info__name">
                        <b>Bruno Cavalli</b>
                    </div>
                    <div className="product-wrapper__product-info__desc">
                        Balo Cavalli 8669
                    </div>
                    <div className="product-wrapper__product-info__price">
                        <div className="price-discounted">
                            <span>1.290.000₫</span>
                        </div>
                        <div className="price-standar">
                            <span>1.842.857₫</span>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default ProductWisper;