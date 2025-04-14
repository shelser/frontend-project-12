import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Navbar, ButtonGroup, Form, InputGroup, Modal} from 'react-bootstrap';
import { actions } from '../slices/channelsSlice.js';
import { selectChannelId } from '../slices/channelsSlice.js';


const Remove = () => {
  
  const userId = JSON.parse(localStorage.getItem('userId'));  
  const currentChannelID = useSelector(selectChannelId);
  const dispatch = useDispatch();
  const hideModal = () => dispatch(actions.setModalInfo({ type: null, item: null }));
  const removeChannel = (id) => async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${userId.token}`,
        },
      });
      dispatch(actions.setCurrentChannelId('1'));
      hideModal();
    } catch (error) {
        console.log(error);          
      }
    
  };  

  return (
    <Modal onHide={hideModal} show container={document.body} centered >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>Отменить</Button>
          <Button onClick={removeChannel(currentChannelID)} type="button" variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )

};

export default Remove;