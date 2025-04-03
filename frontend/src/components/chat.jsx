import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Navbar, ButtonGroup, Form, InputGroup} from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { actions as channelsAction } from '../slices/channelsSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import ChannelsBox from './channelsBox.jsx';
import MessageBox from './messageBox.jsx';
import { useSelector, useDispatch } from 'react-redux';

const Chat = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    /*const userId = localStorage.getItem('userId');*/
    console.log(userId)
    console.log(localStorage.getItem('userId'))
      
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
      
    return {};
  };

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
      console.log(data);
      dispatch(channelsAction.addChannels(data));
    };

    fetchContent();
  }, []);

  const channels = useSelector(channelsSelectors.selectAll);
  console.log(channels);

  return (
    <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Navbar.Brand as={Link} to="/">Secret Chat</Navbar.Brand>
            <Button as={Link} to="/login" state={{ from: location }}>Выйти</Button>
          </div>
        </Navbar>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox />
            <MessageBox />
          </div>  
        </div>
    </div>
  )
};

export default Chat;