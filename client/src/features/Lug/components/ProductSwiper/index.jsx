import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';
import { HeartOutlined, HeartFilled, StarFilled } from '@ant-design/icons';
import './ProductSwiper.scss';
import { Link } from 'react-router-dom';
import { format } from 'assets/global/FormatMoney';
import { useDispatch, useSelector } from 'react-redux';
import { yeuthichApi } from 'api/yeuthichApi';
import { toastSucsess } from 'utils/notification';
import { fetch_wishlist } from 'features/Lug/userSlice';

ProductWisper.propTypes = {
    product: PropTypes.object,
};

ProductWisper.defaultProps = {
    product: {},
}

function ProductWisper(props) {
    const { product } = props;
    const percentSale = Math.round((product.SP_GIAGOC - product.SP_GIABAN) * 100 / product.SP_GIAGOC);
    const { data: { wishlist, wishlistID } } = useSelector(state => state.userInfo)
    const [wishListStatus, setWishListStatus] = React.useState();
    const [addWishList, setAddWishList] = React.useState(false);
    const {
        pagination } = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    // console.log(product);

    const handleAddWishList = async (status, SP_MA) => {
        try {
            if (status === 'add') {
                const { message } = await yeuthichApi.post({ SP_MA: product?.SP_MA })
                toastSucsess(message);

            } else {
                const data = wishlist.find(e => e.SP_MA === SP_MA)
                const { message } = await yeuthichApi.delete(data.YT_MA)
                toastSucsess(message);
            }
            dispatch(fetch_wishlist({ _limit: pagination.wishlist._limit, _page: pagination.wishlist._page, action: 'get_wishlist' }));


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="product-wrapper">
            <div className="product-wrapper__bannerAds">
                {product.DIEM_TB !== 0 ?
                    <p>{product.DIEM_TB} <StarFilled /></p>
                    : <p style={{ fontSize: '12px' }}>0 đánh giá</p>}
            </div>
            {percentSale !== 100 ?
                <div className="product-wrapper__salePer">
                    <span><b>-{percentSale}%</b></span>
                </div>
                : ''}
            <div className="product-wrapper__icon" >
                {!wishlistID?.includes(product?.SP_MA) ?
                    <div onClick={() => handleAddWishList('add')}>
                        <div className="on-hover">
                            <HeartFilled />
                        </div>
                        <div className="off-hover">
                            <HeartOutlined />
                        </div>
                    </div>
                    : <HeartFilled onClick={() => handleAddWishList('delete', product?.SP_MA)} />}

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
                            {product.SP_GIABAN ?
                                <div>
                                    <span>{format(product.SP_GIABAN)}đ</span>
                                    <div className="price-standar">
                                        <span>{format(product.SP_GIAGOC)}₫</span>
                                    </div>
                                </div>
                                : <span>{format(product.SP_GIAGOC)}đ</span>}
                        </div>
                        {/* <p style={{ color: '#FB6E2E' }}>4.5 <StarFilled /></p> */}
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default ProductWisper;