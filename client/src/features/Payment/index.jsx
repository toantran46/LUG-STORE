import React from 'react';
import PropTypes from 'prop-types';
import "./Payment.scss";
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Col, Row } from 'antd';
import InfoCustom from './components/InfoCustomer/index,';
import PaymentMethod from './components/PaymentMethod';

Payment.propTypes = {

};

function Payment(props) {
    return (
        <div className='payment'>
            <Header />
            <div className="title">
                <h4> THANH TOÁN</h4>
            </div>
            <div className="container">
                <Row>
                    <Col xs={32} sm={24} md={12} lg={12} >
                        <InfoCustom />
                    </Col>
                    <Col xs={32} sm={24} md={12} lg={12}>
                        <PaymentMethod />
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;