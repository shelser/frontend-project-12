import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice.js';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
      inputRef.current.focus();
    }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        dispatch(setCredentials(res.data))
        const { from } = location.state;
        navigate(from);

      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;        
      }
    },
  });
    return (
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="avatar.jpg" className="rounded-circle" alt={t('login')} />
                  </div>
                  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">{t('login')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        autoComplete="username"
                        required=""
                        placeholder={t('usernamePlaceholder')}
                        id="username"
                        value={formik.values.username} 
                        onChange={formik.handleChange}
                        isInvalid={authFailed}
                        ref={inputRef}
                      />
                      <Form.Label htmlFor="username">{t('usernamePlaceholder')}</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        name="password"
                        autoComplete="current-password" 
                        required="" 
                        placeholder={t('password')} 
                        type="password" 
                        id="password"  
                        value={formik.values.password} 
                        onChange={formik.handleChange}
                        isInvalid={authFailed}  
                      />
                      <Form.Label className="form-label" htmlFor="password">{t('password')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>{t('errors.invalidUsernameOrPassword')}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3" variant="outline-primary">{t('login')}</Button>
                  </Form>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>{t('no_account')}?</span> 
                    <a href="/signup">{t('registration')}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  };

export default MainPage;