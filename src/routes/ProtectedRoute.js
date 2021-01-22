import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const  ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render = {props =>
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to ='/' />
        }
    />
)

export default ProtectedRoute;