import React from 'react';
import { Carousel } from 'antd';
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types';

import './Banner.scss';
import { useRef } from 'react';

Banner.propTypes = {

};
const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
function Banner(props) {
    const btnRef = useRef();

    const handleClickPrevious = () => {
        btnRef.current.prev();
    }
    const handleClickNext = () => {
        btnRef.current.next();
    }
    return (
        <div className='carousel'>
            <div className="custom-carousel">
                <Carousel autoplay className='carousel-banner' ref={btnRef}>
                    <div>
                        <div className="carousel-picture" style={contentStyle}>
                            <img src="https://bizweb.sapocdn.net/thumb/1024x1024/100/349/716/files/muakemdealhoi-1100x500.png?v=1662547118630" alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="carousel-picture" style={contentStyle}>
                            <img src="https://bizweb.dktcdn.net/100/349/716/files/1920x586-taiapp2tr.png?v=1660496603047" alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="carousel-picture" style={contentStyle}>
                            <img src="https://bizweb.sapocdn.net/thumb/1024x1024/100/349/716/files/1100x500-bruno-usb.png?v=1662611298507" alt="" />
                        </div>
                    </div>
                </Carousel>
                <div className="custom-button">
                    <div className="previous">
                        <LeftCircleOutlined onClick={handleClickPrevious} />
                    </div>
                    <div className="next">
                        <RightCircleOutlined onClick={handleClickNext} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;