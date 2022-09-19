import React from 'react';
import PropTypes from 'prop-types';
import SwiperCustom from '../SwiperCustom';
import { SwiperSlide } from "swiper/react";

TopLugs.propTypes = {

};

function TopLugs(props) {
    return (
        <div>
            <SwiperCustom >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
            </SwiperCustom>
        </div>
    );
}

export default TopLugs;