import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index.js';
import { getModalInfo } from '../slices/channelsSlice.js';


const Modal = () => {

  const modalInfo = useSelector(getModalInfo);
  
  const renderModal = ({ modalInfo, hideModal, setItems }) => {
    if (!modalInfo.type) {
      return null;
    }
  
    const Component = getModal(modalInfo.type);
    return <Component modalInfo={modalInfo} setItems={setItems} onHide={hideModal} />;
  };
  
  return (
    <>
      {renderModal({modalInfo})}
    </>  
  )
};

export default Modal
