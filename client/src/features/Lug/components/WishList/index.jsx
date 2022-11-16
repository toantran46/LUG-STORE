import React from 'react';
import PropTypes from 'prop-types';
import { Col, Empty } from 'antd';
import ListProduct from '../ListProduct';
import { fetch_products } from 'features/Admin/adminSlice';
import { sanphamApi } from 'api/sanphamApi';
import { useSelector } from 'react-redux';
import './WishList.scss';
WishList.propTypes = {

};



function WishList(props) {
    const [productWishList, setProductWishList] = React.useState([]);
    const { user } = useSelector(state => state.auth);
    React.useEffect(() => {
        const fetch_product_wishlist = async () => {
            try {
                const data = {
                    TV_ID: user?.TV_ID,
                }
                const { result } = await sanphamApi.getAll({ wishList: JSON.stringify(data), _page: 1, _limit: 8 })
                // console.log(result);
                setProductWishList(result)

            } catch (error) {
                console.log(error);
            }
        }
        fetch_product_wishlist();
    }, [])
    return (
        <div className='wish-list'>
            <div className="content">
                <div className="title">
                    <h4>SẢN PHẨM YÊU THÍCH</h4>
                    {productWishList?.length > 0 ?
                        <Col xs={24} sm={24} md={24} lg={28}>
                            <div className="products">

                                <ListProduct productList={productWishList} />

                            </div>
                        </Col>
                        : <Empty description={<p>Chưa có sản phẩm yêu thích</p>} />}
                </div>
            </div>
        </div>
    );
}

export default WishList;