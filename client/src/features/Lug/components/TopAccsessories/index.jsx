import React from 'react';
import PropTypes from 'prop-types';
import SwiperCustom from '../SwiperCustom';
import { SwiperSlide } from "swiper/react";
import { sanphamApi } from 'api/sanphamApi';
import ProductWisper from '../ProductSwiper';

TopAccsessories.propTypes = {

};

function TopAccsessories(props) {
    const [productListAccessory, setProductListAccessory] = React.useState([]);

    React.useEffect(() => {
        const fetch_accessory_product = async () => {
            try {
                const { result } = await sanphamApi.getAll({ filterBy: JSON.stringify({ LSP_MALOAI: ['vqgBDQ8C'] }), _page: 1, _limit: 8 })
                // console.log(result);
                setProductListAccessory(result)

            } catch (error) {
                console.log(error);
            }
        }
        fetch_accessory_product();
    }, [])

    React.useEffect(() => {
        // console.log(productListAccessory);
    }, [productListAccessory])
    return (
        <div>
            <SwiperCustom slidesPerView={4} spaceBetween={20}>
                {productListAccessory.map((product, index) =>
                    <SwiperSlide key={index}>
                        <ProductWisper product={product} />
                    </SwiperSlide>)}
            </SwiperCustom>
        </div>
    );
}

export default TopAccsessories;