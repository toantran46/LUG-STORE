import React from 'react';
import PropTypes from 'prop-types';
import SwiperCustom from '../SwiperCustom';
import { SwiperSlide } from "swiper/react";
import './TopBags.scss';
import ProductSwiper from '../ProductSwiper';
import { sanphamApi } from 'api/sanphamApi';
TopBags.propTypes = {

};

function TopBags(props) {
    const [productListBag, setProductListBag] = React.useState([]);

    React.useEffect(() => {
        const fetch_bag_product = async () => {
            try {
                const { result } = await sanphamApi.getAll({ LSP_MALOAI: 'KUF0EuDO', filterBy: 'LSP_MALOAI', _page: 1, _limit: 8 })
                console.log(result);
                setProductListBag(result)

            } catch (error) {
                console.log(error);
            }
        }
        fetch_bag_product();
    }, [])
    return (
        <div className='TopBags'>
            <SwiperCustom slidesPerView={4} spaceBetween={20}>
                {productListBag.map((product, index) =>
                    <SwiperSlide key={index}>
                        <ProductSwiper product={product} />
                    </SwiperSlide>)}
            </SwiperCustom>
        </div>
    );
}

export default TopBags;