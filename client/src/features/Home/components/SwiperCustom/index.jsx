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
    slidesPerView: PropTypes.number,
    spaceBetween: PropTypes.number,
};
SwiperCustom.defaultProps = {
    slidesPerView: null,
    spaceBetween: null
};

function SwiperCustom(props) {
    const { slidesPerView, spaceBetween } = props;
    return (
        <div className='swiper-custom'>
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                navigation={true}
                // pagination={{
                //     clickable: false
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