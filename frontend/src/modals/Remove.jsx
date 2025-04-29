import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import useAuth from '../contexts/useAuth.jsx';
import routes from '../routes.js';
import { actions } from '../slices/channelsSlice.js';
import { closeModal, setCurrentChannelId } from '../slices/modalSlice.js';

const Remove = () => {
  const currentChannelID = useSelector((state) => state.ui.currentChannelId);
  const dispatch = useDispatch();
  const hideModal = () => dispatch(closeModal());
  const { t } = useTranslation();
  const auth = useAuth();

  const removeChannel = (id) => async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${routes.channelsPath()}/${id}`, {
        headers: auth.getAuthHeader(),
      });
      dispatch(setCurrentChannelId('1'));
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
