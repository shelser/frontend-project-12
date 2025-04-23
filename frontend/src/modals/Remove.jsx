import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { actions, selectChannelId } from '../slices/channelsSlice.js';

const Remove = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const currentChannelID = useSelector(selectChannelId);
  const dispatch = useDispatch();
  const hideModal = () => dispatch(actions.setModalInfo({ type: null }));
  const { t } = useTranslation();

  const removeChannel = (id) => async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${userId.token}`,
        },
      });
      dispatch(actions.setCurrentChannelId('1'));
      dispatch(actions.removeChannel(id.id));
      toast.success(t('removed'));
      hideModal();
    } catch (error) {
        toast.error(t('errors.error_network'));
        throw error;
    }
  };

  return (
    <Modal onHide={hideModal} show container={document.body} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('delete_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('you_sure')}
          ?
        </p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2" variant="secondary" onClick={hideModal}>{t('cancel')}</Button>
          <Button onClick={removeChannel(currentChannelID)} type="button" variant="danger">{t('delete')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
