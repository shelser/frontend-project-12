import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions, selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { closeModal, setCurrentChannelId } from '../slices/modalSlice.js';
import routes from '../routes.js';
import useAuth from '../contexts/useAuth.jsx';

const Add = () => {
  const dispatch = useDispatch();
  const hideModal = () => dispatch(closeModal());
  const inputRef = useRef();
  const { t } = useTranslation();
  const nameChannels = Object.values(useSelector(channelsSelectors.selectAll))
    .map((channel) => channel.name);
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().test(
        'length-range',
        t('errors.string_range', { min: 3, max: 20 }),
        (val) => !val || (val.length >= 3 && val.length <= 20),
      ).notOneOf(nameChannels),
    }),
    onSubmit: async (values) => {
      const newChannel = { name: filter.clean(values.name) };
      try {
        const res = await axios.post(routes.channelsPath(), newChannel, {
          headers: auth.getAuthHeader(),
        });
        dispatch(setCurrentChannelId(res.data.id));
        dispatch(actions.addChannel(res.data));
        toast.success(t('created'));
        hideModal();
      } catch (error) {
        toast.error(t('errors.error_network'));
        throw error;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal onHide={hideModal} show container={document.body} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('add_channel')}</Modal.Title>
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
            <Form.Label htmlFor="name" className="visually-hidden">{t('channelName')}</Form.Label>
            {
              formik.errors.name ? (<div className="invalid-feedback">{formik.errors.name}</div>) : null
            }
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>{t('cancel')}</Button>
              <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>{t('submit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
