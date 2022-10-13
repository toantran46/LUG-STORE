import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
Toast.propTypes = {

};

function Toast(props) {
    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Toast;