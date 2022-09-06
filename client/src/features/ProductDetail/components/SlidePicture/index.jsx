import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from "swiper/react";
import './SlidePicture.scss'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

SlidePicture.propTypes = {

};

function SlidePicture(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div className='slide-picture'>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                <SwiperSlide>
                    <img src="https://bizweb.sapocdn.net/100/349/716/products/8689-grey-18-s-square-1.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://bizweb.sapocdn.net/100/349/716/products/8689-grey-18-s-square-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://bizweb.sapocdn.net/100/349/716/products/8689-grey-18-s-square-3.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://bizweb.sapocdn.net/100/349/716/products/8689-grey-18-s-ben-trong.jpg" />
                </SwiperSlide>
            </Swiper>
        </div >
    );
}

export default SlidePicture;