import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './ProductSwiper.scss';
import { Link } from 'react-router-dom';

ProductWisper.propTypes = {
    product: PropTypes.object,
};

ProductWisper.defaultProps = {
    product: {},
}

function ProductWisper(props) {
    const { product } = props;
    return (
        <div className="product-wrapper">
            <div className="product-wrapper__bannerAds">
                <img src="https://bizweb.dktcdn.net/100/349/716/files/label-freeship-plus-plus.png?v=1635739045667" alt="" />
            </div>

            <div className="product-wrapper__salePer">
                <span><b>-60%</b></span>
            </div>
            <div className="product-wrapper__icon">
                <div className="on-hover">
                    <HeartFilled />
                </div>
                <div className="off-hover">
                    <HeartOutlined />
                </div>
            </div>
            <Link to={`/products/${product.SP_MA}`}>
                <img width={200} height={200} src={product.HASP_DUONGDAN} alt="" />
                <div className="product-wrapper__product-info">
                    <div className="product-wrapper__product-info__name">
                        <b>{product.TH_TENTHUONGHIEU}</b>
                    </div>
                    <div className="product-wrapper__product-info__desc">
                        {product.SP_TEN}
                    </div>
                    <div className="product-wrapper__product-info__price">
                        <div className="price-discounted">
                            <span>{product.SP_GIAGOC}₫</span>
                        </div>
                        {/* <div className="price-standar">
                            <span>1.842.857₫</span>
                        </div> */}
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default ProductWisper;