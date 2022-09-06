import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import './BreadCrumb.scss';
import { Link } from 'react-router-dom';

BreadCrumb.propTypes = {

};

function BreadCrumb(props) {
    return (
        <div className="wrapper">
            <div className="wrapper-container">
                <div className='bread-crumb'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to="">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to=""> Balo</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to=""> Balo Cavalli</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
        </div>
    );
}

export default BreadCrumb;