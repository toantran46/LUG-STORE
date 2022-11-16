import React from 'react';
import PropTypes from 'prop-types';
import SwiperCustom from '../SwiperCustom';
import { SwiperSlide } from "swiper/react";
import { sanphamApi } from 'api/sanphamApi';
import ProductWisper from '../ProductSwiper';

TopLugs.propTypes = {

};

function TopLugs(props) {
    const [productListLug, setProductListLug] = React.useState([]);

    React.useEffect(() => {
        const fetch_lug_product = async () => {
            try {
                const { result } = await sanphamApi.getAll({ filterBy: JSON.stringify({ LSP_MALOAI: ['doBujKEr'] }), _page: 1, _limit: 8 })
                // console.log(result);
                setProductListLug(result)

            } catch (error) {
                console.log(error);
            }
        }
        fetch_lug_product();
    }, [])

    React.useEffect(() => {
        // console.log(productListLug);
    }, [productListLug])
    return (
        <div>
            <SwiperCustom slidesPerView={4} spaceBetween={20}>
                {productListLug.map((product, index) =>
                    <SwiperSlide key={index}>
                        <ProductWisper product={product} />
                    </SwiperSlide>)}
            </SwiperCustom>
        </div>
    );
}

export default TopLugs;