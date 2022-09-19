import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './Home.scss';
import { Drawer } from 'antd';
import TopBags from 'features/Lug/components/TopBags';
import Banner from 'features/Lug/components/Banner';

Home.propTypes = {

};

function Home(props) {
    return (
        <div className='home-wrapper'>
            <Header />
            <Banner />
            <div className="topProducts">
                <div className="blackLine">
                    <p>TOP BALO ĐƯỢC YÊU THÍCH</p>
                </div>
                <TopBags />
                <div className="moreProducts">
                    <button className='btn btn-danger btn-lg'>XEM THÊM SẢN PHẨM KHÁC</button>
                </div>
            </div>
            <div className="topProducts">
                <div className="blackLine">
                    <p>TOP TÚI XÁCH ĐƯỢC YÊU THÍCH</p>
                </div>
                <TopBags />
                <div className="moreProducts">
                    <button className='btn btn-danger btn-lg'>XEM THÊM SẢN PHẨM KHÁC</button>
                </div>
            </div>
            <div className="topProducts">
                <div className="blackLine">
                    <p>TOP PHỤ KIỆN ĐƯỢC YÊU THÍCH</p>
                </div>
                <TopBags />
                <div className="moreProducts">
                    <button className='btn btn-danger btn-lg'>XEM THÊM SẢN PHẨM KHÁC</button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;