import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import ProductWisper from '../ProductSwiper';

ListProduct.propTypes = {
    productList: PropTypes.array,
};

ListProduct.defaultProps = {
    productList: []
}

function ListProduct(props) {
    const { productList } = props;
    return (
        <div>
            <Row>
                {productList.map((product, index) =>
                    <Col sm={18} md={12} lg={6} index={index} >
                        < ProductWisper product={product} />
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default ListProduct;