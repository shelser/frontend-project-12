import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, } from 'react-router-dom';
import MainPage from './components/mainPage.jsx';
import PageNotFound from './components/pageNotFound.jsx';
import Chat from './components/chat.jsx';
import ChatRoute from './components/chatRoute.jsx';
import { Provider, useSelector } from 'react-redux'
import store from './slices/index.js'



const init = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="login" element={<MainPage />} />
        <Route path="/" 
          element={(
            <ChatRoute>
              <Chat />
            </ChatRoute>
          )} 
        />
      </Routes>
    </BrowserRouter>
    </Provider>  
)

export default init;