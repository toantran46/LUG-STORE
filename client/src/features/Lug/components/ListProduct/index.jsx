import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import ProductWisper from '../ProductSwiper';

ListProduct.propTypes = {

};

function ListProduct(props) {
    const products = new Array(20).fill(0);
    return (
        <div>
            <Row>
                {products.map((value, index) => <Col sm={18} md={12} lg={6} index={index} >< ProductWisper /></Col>)}
            </Row>
        </div>
    );
}

export default ListProduct;