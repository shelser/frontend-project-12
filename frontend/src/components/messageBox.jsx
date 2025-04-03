import React, { useEffect, useRef, useState } from 'react';
import { Button, Navbar, ButtonGroup, Form, InputGroup} from 'react-bootstrap';
import { useFormik } from 'formik';

const MessageBox = () => {
  const formik = useFormik({
      initialValues: {
        body: '',
      },
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b></b>
          </p>
          <span className="text-muted"></span>
        </div>
        <div id="message-box" className="chat-messages overflow-auto px-5">
    
        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <InputGroup hasValidation>
              <Form.Control
                name="body" 
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 ps-2 p-0"
                value={formik.values.body} 
                onChange={formik.handleChange}
            />
            <button type="submit" className="btn btn-group-vertical" disabled="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  )
};

export default MessageBox;