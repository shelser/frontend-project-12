import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/mainPage.jsx';
import PageNotFound from './components/pageNotFound';

const init = () => (

    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="login" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
)

export default init;