import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import SystemUser from './helper/user';
const privateRoute = ({ children }) => {
  if (SystemUser.token == '' ) {
    return <Redirect to="/signin" replace />;
  }
  return children;
};
export default privateRoute;