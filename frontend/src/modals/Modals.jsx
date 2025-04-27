import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index.js';

const Modal = () => {
  const modalInfo = useSelector((state) => state.ui.modal);
  const renderModal = (type) => {
    if (!modalInfo.type) {
      return null;
    }
    const Component = getModal(modalInfo.type);
    return <Component modalInfo={type} />;
  };
  return (
    <>
      {renderModal(modalInfo.type)}
    </>
  );
};

export default Modal;
