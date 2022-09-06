import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from 'components/BreadCrumb';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './Bags.scss';
import MenuSort from './components/MenuSort';
import HeadBread from './components/HeadBread';
import ListProduct from './components/ListProduct';
import { Col, Row } from 'antd';

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