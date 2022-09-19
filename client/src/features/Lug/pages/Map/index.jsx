import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import "./Map.scss";

Map.propTypes = {

};

function Map(props) {
    return (
        <div className='map'>
            <Header />
            <div className="container">
                <h4>ĐỊA CHỈ CỬA HÀNG</h4>
                <iframe
                    width="100%"
                    height="500px"
                    frameborder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAP_API}&q=1+Đ.+Lý+Tự+Trọng,+Tân+An,+Ninh+Kiều,+Cần+Thơ,+Việt+Nam`}
                    allowfullscreen
                />
            </div>

            <Footer />
        </div>
    );
}

export default Map;