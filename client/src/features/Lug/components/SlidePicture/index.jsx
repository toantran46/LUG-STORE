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
    listImages: PropTypes.array,
};
SlidePicture.defaultProps = {
    listImages: []
}
function SlidePicture(props) {
    const { listImages } = props;
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
                {
                    listImages?.map((data) =>
                        <SwiperSlide>
                            <img src={data} />
                        </SwiperSlide>
                    )
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    listImages?.map((data) =>
                        <SwiperSlide>
                            <img src={data} />
                        </SwiperSlide>
                    )
                }
            </Swiper>

        </div >
    );
}

export default SlidePicture;