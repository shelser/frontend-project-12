import React, { useEffect, useRef, useState } from 'react';
import { Button, Navbar, ButtonGroup, Form, InputGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { actions } from '../slices/channelsSlice.js';
import { selectChannelId } from '../slices/channelsSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

const socket = io();


const ChannelsBox = () => {

  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(selectChannelId);
  const showModal = (type, item = null) => dispatch(actions.setModalInfo({ type, item }));
  const { t } = useTranslation();


  const renderButton = (channels) => {
    const button = channels.map((channel) => {
      if (channel.removable === false) {
        return (
          <li key={ channel.id } className="nav-item w-100">
            <button onClick={() => dispatch(actions.setCurrentChannelId(channel.id))} type="button" className={cn('w-100', 'rounded-0', 'text-start', 'btn', channel.id === currentChannelId ? 'btn-secondary' : null)}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>  
        )
      }
      return (
        <li key={ channel.id } className="nav-item w-100">
        <Dropdown onClick={() => dispatch(actions.setCurrentChannelId(channel.id))} as={ButtonGroup} className="d-flex show">
          <Button className="w-100 rounded-0 text-start text-truncate" variant={channel.id === currentChannelId ? "secondary" : null}>
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle split variant={channel.id === currentChannelId ? "secondary" : null} id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => showModal('removing')}>{t('delete')}</Dropdown.Item>
            <Dropdown.Item onClick={() => showModal('renaming')}>{t('rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </li>
      )
    });
    return button
  }

  useEffect(() => {

    socket.on('removeChannel', (id) => {
      dispatch(actions.removeChannel(id.id))
    });

    socket.on('newChannel', (channel) => {
        dispatch(actions.addChannel(channel))
      });
     
    socket.on('renameChannel', (channel) => {
      dispatch(actions.renameChannel({id: channel.id, changes: channel}));
    });
    
    socket.on('connect_error', () => {
      toast.error(t('errors.connect_error'))
    });
    
    },[]);
  
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button onClick={() => showModal('adding')} className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {/*  {channels.map((channel) =>
          <li key={ channel.id } className="nav-item w-100">
            <button onClick={() => dispatch(actions.setCurrentChannelId(channel.id))} type="button" className={cn('w-100', 'rounded-0', 'text-start', 'btn', channel.id === currentChannelId ? 'btn-secondary' : null)}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
            { channel.removable === true ? renderDropdownButton() : null}
          </li>)} */}
          {renderButton(channels)}
      </ul>
    </div>
  )
};

export default ChannelsBox;