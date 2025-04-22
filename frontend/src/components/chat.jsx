import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { actions as channelsAction } from '../slices/channelsSlice.js';
import { actions as messagesAction } from '../slices/messagesSlice.js';
import ChannelsBox from './channelsBox.jsx';
import MessageBox from './messageBox.jsx';
import Modal from '../modals/Modals.jsx';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


const Chat = () => {
  
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
      
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }  
    return {};
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
      const channelsResponse = await axios.get('/api/v1/channels', { headers: getAuthHeader() });
      dispatch(channelsAction.addChannels(channelsResponse.data));

      const messagesResponse = await axios.get('/api/v1/messages', { headers: getAuthHeader() });
      dispatch(messagesAction.addMessages(messagesResponse.data));
      } catch (error) {
        toast.error(t('errors.error_network'));
        throw error; 
      }   
    };
    fetchChat();
  }, []);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Navbar.Brand as={Link} to="/">{t('hexletChat')}</Navbar.Brand>
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