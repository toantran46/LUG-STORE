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

Bags.propTypes = {

};



function Bags(props) {
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
                        <Col xs={24} sm={18} md={12} lg={6}>
                            <div className="menu-sort">
                                <MenuSort />
                            </div>
                        </Col>
                        <Col xs={24} sm={6} md={12} lg={18}>
                            <div className="products">
                                <ListProduct />
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