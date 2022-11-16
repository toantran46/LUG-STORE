import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

AdminRoute.propTypes = {

};

function AdminRoute({ isAllow, redirectPath = '/', children }) {

    return !isAllow ? <Navigate to={redirectPath} replace /> : children;
};

export default AdminRoute;