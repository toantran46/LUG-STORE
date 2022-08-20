import React from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';

import './Banner.scss';

Banner.propTypes = {

};
const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
function Banner(props) {
    return (
        <div className='carousel'>
            <Carousel autoplay>
                <div>
                    <div className="carousel-picture" style={contentStyle}>
                        <img src="https://bizweb.dktcdn.net/100/349/716/files/1920-x-586-pw11529.png?v=1657608021940" alt="" />
                    </div>
                </div>
                <div>
                    <div className="carousel-picture" style={contentStyle}>
                        <img src="https://bizweb.dktcdn.net/100/349/716/files/1920x586-taiapp2tr.png?v=1660496603047" alt="" />
                    </div>
                </div>
                <div>
                    <div className="carousel-picture" style={contentStyle}>
                        <img src="https://bizweb.dktcdn.net/100/349/716/files/1920x586-eco1.png?v=1660018342187" alt="" />
                    </div>
                </div>
            </Carousel>
        </div>
    );
}

export default Banner;