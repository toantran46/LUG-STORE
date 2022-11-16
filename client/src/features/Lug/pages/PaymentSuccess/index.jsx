import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './PaymentSuccess.scss';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, HistoryOutlined } from '@ant-design/icons';
PaymentSuccess.propTypes = {

};

function PaymentSuccess(props) {
    return (
        <div>
            <Header />
            <div className="payment-success">
                <div className="container">
                    <h4><img width={200} height={150} src="https://i.gifer.com/7efs.gif" alt="" />Đặt hàng thành công</h4>
                    <div className="content">
                        <div className='notifi'>Bạn đã đặt hàng thành công, vui lòng chờ xác nhận của cửa hàng</div>
                        <div className='url-back'>
                            <div className="url-left"><Link to={'/'} ><ArrowLeftOutlined /> Tiếp tục mua hàng</Link></div>
                            <div className="url-right"><Link to={'/user'} state={{ tab: '2' }} >Xem lịch sử đặt hàng <HistoryOutlined /></Link></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PaymentSuccess;