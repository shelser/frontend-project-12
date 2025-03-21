import React from 'react';
import ReactDOM from 'react-dom/client';
import init from './init';
import 'bootstrap/dist/css/bootstrap.min.css'

const app = async () => {
    const root = ReactDOM.createRoot(document.querySelector('#root'));
    root.render(init());
  };
  
  app();