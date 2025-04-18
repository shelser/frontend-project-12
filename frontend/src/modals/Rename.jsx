import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import cn from 'classnames';

import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Navbar, ButtonGroup, Form, InputGroup, Modal} from 'react-bootstrap';
import { actions } from '../slices/channelsSlice.js';
import { selectChannelId } from '../slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import filter from 'leo-profanity';


const Rename = () => {
  const dispatch = useDispatch()
  const currentChannelID = useSelector(selectChannelId);
  const userId = JSON.parse(localStorage.getItem('userId'));
  const inputRef = useRef();
  const { t } = useTranslation();
  filter.add(filter.getDictionary('ru'))
  
  const hideModal = () => dispatch(actions.setModalInfo({ type: null, item: null }));

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().test('length-range',
        t('errors.string_range', { min: 3, max: 20 }),
        val => !val || (val.length >= 3 && val.length <= 20)),
    }),
    onSubmit: async (values) => {
      const editedChannel = { name: filter.clean(values.name) };
      console.log(editedChannel)
      try {
        const res = await axios.patch(`/api/v1/channels/${currentChannelID}`, editedChannel, {
          headers: {
            Authorization: `Bearer ${userId.token}`,
          },
          
        });
        toast.success(t('renamed'));
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
        <Modal.Title>{t('rename_channel')}</Modal.Title>
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
            <Form.Label htmlFor="name" className="visually-hidden"></Form.Label>
            {formik.touched.name && formik.errors.name ? (
              <div className="invalid-feedback">{formik.errors.name}</div>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>{t('cancel')}</Button>
              <Button type="submit">{t('submit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
};

export default Rename;