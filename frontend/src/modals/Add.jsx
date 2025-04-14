import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Navbar, ButtonGroup, Form, InputGroup, Modal} from 'react-bootstrap';
import { actions } from '../slices/channelsSlice.js';


const Add = () => {

  const userId = JSON.parse(localStorage.getItem('userId'));
  const dispatch = useDispatch();
  const hideModal = () => dispatch(actions.setModalInfo({ type: null, item: null }));
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().min(3).max(20)
    }),
    onSubmit: async (values) => {
      const newChannel = { name: values.name };
      try {
        const res = await axios.post('/api/v1/channels', newChannel, {
          headers: {
            Authorization: `Bearer ${userId.token}`,
          },
        });
        dispatch(actions.setCurrentChannelId(res.data.id));
        hideModal();
      } catch (error) {
        console.log(error);          
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal onHide={hideModal} show container={document.body} centered >
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control 
              id="name"
              name="name"
              className={cn('mb-2', formik.errors.name ? 'is-invalid' : null)}
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputRef}
            />
            <Form.Label htmlFor="name" className="visually-hidden">Имя канала</Form.Label>
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>Отменить</Button>
              <Button type="submit">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
};

export default Add;