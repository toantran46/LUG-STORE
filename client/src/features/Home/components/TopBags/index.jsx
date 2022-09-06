import React from 'react';
import PropTypes from 'prop-types';
import SwiperCustom from '../SwiperCustom';
import { SwiperSlide } from "swiper/react";
import './TopBags.scss';
import ProductSwiper from '../ProductSwiper';
TopBags.propTypes = {

};

function TopBags(props) {
    const product = new Array(10).fill(0);
    return (
        <div className='TopBags'>
            <SwiperCustom slidesPerView={4} spaceBetween={20}>
                {product.map((value, index) => <SwiperSlide key={index}><ProductSwiper /></SwiperSlide>)}
            </SwiperCustom>
        </div>
    );
}

export default TopBags;