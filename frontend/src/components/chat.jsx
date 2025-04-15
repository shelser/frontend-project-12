import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Navbar, ButtonGroup, Form, InputGroup} from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { actions as channelsAction } from '../slices/channelsSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import ChannelsBox from './channelsBox.jsx';
import MessageBox from './messageBox.jsx';
import Modal from '../modals/Modals.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


const Chat = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const { t } = useTranslation();

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
      
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }  
    return {};
  };

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
      dispatch(channelsAction.addChannels(data));
    };

    fetchContent();
  }, []);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Navbar.Brand as={Link} to="/">Secret Chat</Navbar.Brand>
            <Button as={Link} to="/login" state={{ from: location }} onClick={() => localStorage.removeItem('userId')}>{t('logout')}</Button>
          </div>
        </Navbar>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <MessageBox />
          </div>  
        </div>
      </div>
      <Modal />
    </>  
  )
};

export default Chat;