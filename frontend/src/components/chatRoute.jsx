import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux'

const ChatRoute = ({ children }) => {
    const location = useLocation();
    const userId = JSON.parse(localStorage.getItem('userId'));
  
    return userId && userId.token ? children : <Navigate to="/login" state={{ from: location.pathname }} />
};
 
export default ChatRoute;