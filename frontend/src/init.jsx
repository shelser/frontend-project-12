import React, { useState } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter, Routes, Route, Navigate, useLocation, } from 'react-router-dom';
import MainPage from './components/mainPage.jsx';
import PageNotFound from './components/pageNotFound.jsx';
import Chat from './components/chat.jsx';
import ChatRoute from './components/chatRoute.jsx';
import Signup from './components/signup.jsx';
import { Provider, useSelector } from 'react-redux'
import store from './slices/index.js';
import resources from './locales/index.js';
import * as yup from 'yup';




const init = async () => {

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      debug: true,
    });

    yup.setLocale({
      mixed: {
        required: () => i18n.t('errors.required'),
        oneOf: () => i18n.t('errors.notMatchPassword'),
      },
      string: {
        min: ({ min }) => i18n.t('errors.string_min', { min }),
        max: ({ max }) => i18n.t('errors.string_max', { max }),
        
      },
    }); 

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="login" element={<MainPage />} />
            <Route path="signup" element={<Signup />} />
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
    </I18nextProvider>  
  )
};

export default init;