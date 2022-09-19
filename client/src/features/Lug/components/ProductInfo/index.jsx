import React from 'react';
import PropTypes from 'prop-types';
import './ProductInfo.scss';
import { Link } from 'react-router-dom';

ProductInfo.propTypes = {

};

function ProductInfo(props) {
    return (
        <div className='product-info'>
            <div className="product-info__name">
                <span>Balo Cavalli 6868</span>
            </div>
            <div className="product-info__brand">
                Thương hiệu: <Link to="">Bruno Cavalli</Link>
            </div>
            <div className="product-info__price">
                <span className='discounted'>1.290.000₫</span>
                <span className='standar'>1.842.857₫</span>
                <span className='perSale'>-30%</span>
            </div>
            <div className="product-info__color">
                <div className="menu__color">
                    <p>Màu sắc</p>
                    <div className="swatch-list-color">
                        <ul className='list-color'>
                            <li className='swatch-yellow'>
                                <p title='yellow'></p>
                            </li>
                            <li className='swatch-red'>
                                <p title='red'></p>
                            </li>
                            <li className='swatch-white'>
                                <p title='white'></p>
                            </li>
                            <li className='swatch-black'>
                                <p title='black'></p>
                            </li>
                            <li className='swatch-green'>
                                <p title='green'></p>
                            </li>
                            <li className='swatch-orange'  >
                                <p title='orange'></p>
                            </li>
                            <li className='swatch-blue'  >
                                <p title='blue'></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="product-info__button">
                <Link to={"/cart"}>
                    <button className='btn btn-danger btn-block'>
                        <span>MUA NGAY</span><br />
                        <span>TIẾT KIỆM ĐẾN 552.857₫</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ProductInfo;