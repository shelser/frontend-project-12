import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../contexts/useAuth.jsx';
import routes from '../routes.js';

const ChatRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  return auth.loggedIn ? children : <Navigate to={routes.mainPage} state={{ from: location.pathname }} />;
};

export default ChatRoute;
