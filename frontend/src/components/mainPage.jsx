import React from 'react';
import { useFormik } from 'formik';

const MainPage = () => {
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
    return (
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="avatar.jpg" className="rounded-circle" alt="Войти" />
                  </div>
                  <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="userName"
                        autoComplete="userName"
                        required=""
                        placeholder="Ваш ник" 
                        id="userName"
                        className="form-control" 
                        value={formik.values.userName} 
                        onChange={formik.handleChange}
                      />
                      <label htmlFor="userName">Ваш ник</label>
                    </div>
                    <div className="form-floating mb-4">
                      <input
                        name="password"
                        autoComplete="current-password" 
                        required="" 
                        placeholder="Пароль" 
                        type="password" 
                        id="password" 
                        className="form-control" 
                        value={formik.values.password} 
                        onChange={formik.handleChange}  
                      />
                      <label className="form-label" htmlFor="password">Пароль</label>
                    </div>
                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                  </form>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>Нет аккаунта?</span> 
                    <a href="/signup">Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  };

export default MainPage;