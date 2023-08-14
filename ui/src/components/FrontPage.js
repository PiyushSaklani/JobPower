import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import download from './download.jpg'
// import background from './project-1.png';
import { useNavigate } from 'react-router-dom';
import { data } from './const';
import { user_data } from '../constants/constants';

const FrontPage = () => {
    const navigate = useNavigate()
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [password2, setPassword2] = useState('');
    // const [role, setRole] = useState('')

    const login = () => {
        navigate('/login')
    }

    const signup = () => {
        navigate('/signup')
    }

    return (
        <div className='signup-main-con'>
            <div className='signup-bg-con'></div>
            <div className='signup-con'>
                <div className='signup-blur-container' style={{padding:"8%"}}>
                        <img src={download}></img>
                    <h2 className='signup-subtitle'>Welcome to Job Power!</h2>
                    <p className='slogan'>Find your dream job, today and tomorrow.
                        Join our site, and let your career grow!</p>
                    <button className='signup-btn' style={{padding:'8px'}} onClick={login}>Login</button>
                    <div className='signup-bottom'>
                        - Or -
                    </div>
                    <button className='signup-btn' onClick={signup} style={{padding:'8px'}}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default FrontPage;