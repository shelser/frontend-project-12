import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

import { actions as actionsChannels } from '../slices/channelsSlice.js';
import { actions as actionsMessages } from '../slices/messagesSlice.js';

const Socket = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const socket = io();

    socket.on('removeChannel', (id) => {
      dispatch(actionsChannels.removeChannel(id.id));
    });

    socket.on('newChannel', (channel) => {
      dispatch(actionsChannels.addChannel(channel));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(actionsChannels.renameChannel({ id: channel.id, changes: channel }));
    });

    socket.on('newMessage', (messages) => {
      dispatch(actionsMessages.addMessage(messages));
    });

    socket.on('connect_error', () => {
      toast.error(t('errors.error_network'));
    });
  }, [dispatch, t]);

  return children;
};

export default Socket;
