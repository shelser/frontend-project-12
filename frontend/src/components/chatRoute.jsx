import React from 'react';
import { Navigate, useLocation, } from 'react-router-dom';

const ChatRoute = ({ children }) => {
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('userId'));
  
  return userId && userId.token ? children : <Navigate to="/login" state={{ from: location.pathname }} />
};

export default ChatRoute;