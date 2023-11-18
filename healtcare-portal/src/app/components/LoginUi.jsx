import './LoginUi.css';
import profile from "../image/a.png";
import email from "../image/email.jpg";
import pass from "../image/pass.png";
import React, { useState } from 'react';
import axios from 'axios';
import { setGlobalState, useGlobalState } from './state';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom"
import atob from 'atob';

function LoginUi() {
  const history = useNavigate();
  const [formData, setFormData] = useState();
  const [error, setError] = useState('');

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  function clickHandler() {
    const { email, password } = formData;

    axios.post("http://localhost:5000/api/v1/auth/login", {
      email, password
    }).then(res => {
      console.log(res.data.token);
      const role = JSON.parse(atob(res.data.token.split(".")[1]));
      setGlobalState("jwtToken", res.data.token);
      setGlobalState("token", role);
      setGlobalState("LoggedIn", true);
      setGlobalState("loggedInUser", email);
      history('/');
    }).catch(err => {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    });
  }

  return (
    <>
      <Navbar />
      <div className="main text-center justify-center items-center flex flex-col py-12">
        {error ? <p style={{ color: 'red' }}><i className="zmdi zmdi-close-circle material-icons-name mr-2"></i>{error}</p> : null}

        <div className="sub-main flex justify-center h-96 w-2/5 shadow-2xl py-8 rounded-xl bg-white">
          <div className="imgs pt-5 flex justify-center">
            <div className="container-image rounded-full items-center flex justify-center h-24 w-24 mb-5">
              <img src={profile} alt="profile" className="profile h-16 w-16 rounded-full" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl">Login Page</h3>
            <div className="pt-5">
              <img src={email} alt="email" className="email h-6 w-6 absolute" />
              <input
                className="loginInput name"
                name="email"
                onChange={changeHandler}
                type="text"
                placeholder="email"
              />
            </div>
            <div className="second-input pt-5">
              <img src={pass} alt="pass" className="email h-6 w-6 absolute" />
              <input
                className="loginInput name"
                name="password"
                onChange={changeHandler}
                type="password"
                placeholder="password"
              />
            </div>
            <div>
              <button className="login-button" onClick={clickHandler}>
                Login
              </button>
            </div>
            <p className="link text-sm">
              <a className="linkLogin" href="#">
                Forgot password?
              </a>{' '}
              Or{' '}
              <a className="linkLogin" href="#">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUi;
