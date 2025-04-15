import axios, { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import cn from 'classnames';
import { actions } from '../slices/usersSlice.js';

const Signup = () => {
  
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    inputRef.current.focus();
      }, []);
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().required().min(3).max(20),
      password: yup.string().required().min(6),
      confirmPassword: yup.string().required().oneOf([yup.ref('password'), null])
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post('/api/v1/signup', values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        /*dispatch(actions.addUser(res.data))*/
        navigate('/');
      } catch (error) {
          if (error.isAxiosError && error.response.status === 409) {
            setAuthFailed(true);
            inputRef.current.select();
            formik.setStatus(error.message)
            return;
          }
          throw error;        
        }
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Navbar.Brand as={Link} to="/">Secret Chat</Navbar.Brand>
        </div>
      </Navbar>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="avatar2.jpg" className="rounded-circle" alt="Регистрация" />
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">Регистрация</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      type="text"
                      name="username"
                      autoComplete="username"
                      required=""
                      placeholder="Ваш ник" 
                      id="username"
                      value={formik.values.username} 
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.username && formik.errors.username || authFailed}
                      ref={inputRef}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      name="password"
                      autoComplete="new-password" 
                      required="" 
                      placeholder="Пароль" 
                      type="password" 
                      id="password"  
                      value={formik.values.password} 
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.password && formik.errors.password || authFailed}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Label className="form-label" htmlFor="password">Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      name="confirmPassword"
                      autoComplete="new-password" 
                      required="" 
                      placeholder="Пароль" 
                      type="password" 
                      id="confirmPassword"  
                      value={formik.values.confirmPassword} 
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword || authFailed}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Label className="form-label" htmlFor="confirmPassword"> Подтвердите пароль</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword || formik.status}</Form.Control.Feedback>
                    
                  </Form.Group>
                  <Button type="submit" className="w-100 mb-3" variant="outline-primary">Зарегистрироваться</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Signup;

