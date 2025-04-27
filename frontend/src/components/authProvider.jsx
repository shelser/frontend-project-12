import React, { useState } from 'react';
import AuthContext from '../contexts/authContext.jsx';

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [userInfo, setUserInfo] = useState();
  const [loggedIn, setLoggedIn] = useState(!!userId);

  const logIn = (data) => {
    setUserInfo(data);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, getAuthHeader, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
