import React from 'react';
import PropTypes from 'prop-types';
import './Specification.scss';
import { CaretRightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

Specification.propTypes = {

};

function Specification(props) {
    return (
        <div className="detail">
            <div className="link">
                <Link to='/map'>
                    <EnvironmentOutlined /> Địa chỉ cửa hàng
                </Link>
            </div>
            <div className='specification'>
                <div className="specification__info">
                    <div className='title-head'>THÔNG SỐ KỸ THUẬT</div>
                    <div><span className='content'>Số ngăn: </span>2 ngăn chính và các ngăn phụ</div>
                    <div><span className='content'>Chất liệu: </span>Polyester</div>
                    <div><span className='content'>Kích thước: </span>44 x 29 x 18 cm</div>
                    <div><span className='content'>Cân nặng: </span>600 gram</div>
                    <div><span className='content'>Tính năng nổi bật: </span>Có ngăn laptop 15' trở lên, chất liệu trược nước hạn chế thấm nước, tích hợp cổng usb</div>
                </div>
            </div>
        </div>
    );
}

export default Specification;