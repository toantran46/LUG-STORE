import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from 'components/BreadCrumb';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './Bags.scss';
import { Col, Row } from 'antd';
import HeadBread from 'features/Lug/components/HeadBread';
import MenuSort from 'features/Lug/components/MenuSort';
import ListProduct from 'features/Lug/components/ListProduct';
import { sanphamApi } from 'api/sanphamApi';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

Bags.propTypes = {

};



function Bags(props) {
    const [productListBag, setProductListBag] = React.useState([]);
    const [brandChanges, setbrandChanges] = React.useState(null);
    const [colorChanges, setcolorChanges] = React.useState(null);
    const [price, setPrice] = React.useState();

    const locate = useLocation();
    const { shortBy } = useSelector(state => state.userInfo);
    // console.log(shortBy)
    const [filterBy, setFilterBy] = React.useState({
        LSP_MALOAI: ['KUF0EuDO'],
        TH_MATHUONGHIEU: [],
        MS_MAMAU: [],
        SP_GIAGOC: [100000, 3000000]
    })
    React.useEffect(() => {
        setFilterBy({
            ...filterBy,
            TH_MATHUONGHIEU: brandChanges,
            MS_MAMAU: colorChanges,
            SP_GIAGOC: price,
        })
    }, [brandChanges, colorChanges, price])
    console.log(filterBy);
    // sqlFilter = ''
    // filterBy = {
    // LSP_MALOAI: ['KUF0EuDO'],

    // }
    // AND LSP_MALOAI IN ('KUF0EuDO')
    React.useEffect(() => {
        const fetch_bag_product = async () => {
            try {
                const { result } = await sanphamApi.getAll(
                    {
                        filterBy: JSON.stringify(filterBy),
                        shortBy: shortBy.length > 0 ? shortBy : '',
                        _page: 1, _limit: 8
                    })
                // console.log(result);
                setProductListBag(result)

            } catch (error) {
                console.log(error);
            }
        }
        fetch_bag_product();
        console.log(filterBy)
    }, [filterBy, shortBy])
    React.useEffect(() => {
        setFilterBy(prev => ({ ...filterBy, LSP_MALOAI: locate.state.LOAISANPHAM }))
    }, [locate.state])
    return (
        <div>
            <Header />
            <BreadCrumb />
            <div className="container">
                <div className="banner-bag">
                    <div className="responsive">
                    </div>
                </div>
                <div className="list-product">
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24}>
                            <div className="bread">
                                <HeadBread />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={10} lg={10}>
                            <div className="menu-sort">
                                <MenuSort brandChange={setbrandChanges} colorChange={setcolorChanges} price={setPrice} />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={14}>
                            <div className="products">
                                <ListProduct productList={productListBag} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Bags;