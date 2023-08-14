import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './Main.css'
import GoogleLogOutBtn from './googlelogoutbtn';
import { user } from './googlebtn';
import { data } from './const';

const MainPage = () => {
  const navigate = useNavigate();

  function handleChange(){
    navigate("/signup");
  }
  return (
    <div className='ms-main-con'>
      <div className='ms-title-bar'>
        <h3 className='ms-title'>JobPower</h3>
        <h3 className='ms-display-name'>{data.user}</h3>
        <GoogleLogOutBtn />
      </div>
      <div className='ms-con'>
        <div className='ms-blur-con' >
          <h2 className='ms-welcome'>Welcome :)</h2>
          {/* <div className='ms-display-name'>{data.user}</div> */}
        </div>
      </div>
    </div>
  );
}

export default MainPage;


{/* <h1 className='main-title'>Welcome to the Job Portal!</h1>
      <div className='main-subheading'>
      <p>Here are some available jobs:</p>
      <ul>
        <li>Job 1</li>
        <li>Job 2</li>
        <li>Job 3</li>
      </ul>
      </div>
      <GoogleLogOutBtn /> */}