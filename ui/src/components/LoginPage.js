import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
// import axios from 'axios';
import './Login.css'
import GoogleBtn from './googlebtn';
import { data } from './const';
import GitHubBtn from './github';
import { user_data } from '../constants/constants';

// const CLIENT_ID = "3584ebcb02e8bbe0ba8b";
const CLIENTG_ID = "244873686234-vtvor8q41b9eoe6vu3sdk3cjcer506c2.apps.googleusercontent.com"

const LoginPage = () => {

  // Google oAuth useEffect
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENTG_ID,
      })
    };
    gapi.load('client:auth2', start);
  })

  // function loginwithGitHub() {
  //   window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  // }

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const codeParam = urlParams.get("code");
  //   console.log(codeParam);
  // }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const datas = await response.json();
      console.log(datas)
      if (datas.success) {
        data.user = datas.email
        user_data.email=datas.email
        user_data.name=datas.name
        user_data.role=datas.role
        console.log(datas)

        if(datas.role !== "recruiter"){
          navigate('/main-screen');
        }else{navigate('/r-main-screen')}
      }
    } catch (err) {
      if (err.message === "Incorrect Email!" || err.message === "Incorrect Passowrd!") {
        console.error(err);
      } else {
        console.error("hello")
      }
    }
  };


  return (
    <div className='login-main-con'>
      <div className='login-bg-con'></div>
      <div className='login-con'>
        <div className='login-blur-container'>
          <h1 className='login-title'>LogIn</h1>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label id='login-subheading'>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label id='login-subheading'>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className='login-fp'><Link to="/forgotpassword">Forgot Password?</Link></div>
          </Form>
          <div className='login-btm'>
            <button className='login-butn' onClick={handleSubmit}> Login</button>
          </div>
          <div className='login-bottom'>
            - Or -
          </div>
          <div className='login-bottom-btns'>
            {/* <button className='btn-login' onClick={GitHubBtn}> GitHub</button> */}
            <GitHubBtn />
            <div className='login-empty'></div>
            <GoogleBtn />
          </div>
          <div className='login-bottom-text'>
            <p>
              Don't have an account? <Link to="/signup">SignUp</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;