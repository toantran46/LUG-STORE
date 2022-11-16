import React from 'react';
import PropTypes from 'prop-types';
import './Specification.scss';
import { CaretRightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

Specification.propTypes = {
    product: PropTypes.object,
};
Specification.defaultProps = {
    product: {},
}

function Specification(props) {
    const { product } = props;
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
                    <div className='line'><span className='content'>Số ngăn: </span>{product.SP_SONGAN}</div>
                    <div className='line'><span className='content'>Chất liệu: </span>{product.SP_CHATLIEU}</div>
                    <div className='line'><span className='content'>Kích thước: </span>{product.SP_KICHTHUOC}</div>
                    <div className='line'><span className='content'>Cân nặng: </span>{product.SP_CANNANG}</div>
                    <div className='line'><span className='content'>Tính năng nổi bật: </span>{product.SP_TINHNANG}</div>
                </div>
            </div>
        </div>
    );
}

export default Specification;