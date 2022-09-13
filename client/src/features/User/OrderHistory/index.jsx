import React from 'react';
import PropTypes from 'prop-types';
import "./OrderHistory.scss";

OrderHistory.propTypes = {

};

function OrderHistory(props) {
    return (
        <div className='order-history'>
            <div className="content">
                <div className="title">
                    <h4>LỊCH SỬ MUA HÀNG</h4>
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;