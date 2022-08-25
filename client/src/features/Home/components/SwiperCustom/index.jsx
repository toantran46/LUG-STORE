import React from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SwiperCustom.scss";

// import required modules
import { Pagination, Navigation } from "swiper";

SwiperCustom.propTypes = {

};

function SwiperCustom(props) {
    return (
        <div className='swiper-custom'>
            <Swiper
                slidesPerView={4}
                spaceBetween={20}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                navigation={true}
                // pagination={{
                //     clickable: true
                // }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {props.children}
            </Swiper>
        </div>
    );
}

export default SwiperCustom;