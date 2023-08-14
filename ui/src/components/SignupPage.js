import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
// import background from './project-1.png';
import { useNavigate } from 'react-router-dom';
import { data } from './const';
import { user_data } from '../constants/constants';

const SignupPage = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password === password2) {
            try {
                const response = await fetch('/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, password2, role, name }),
                });

                if (response.ok) {
                    const datas = await response.json();
                    // Do something with the response data, such as setting it in state
                    data.user = name
                    user_data.email = datas.email
                    user_data.name = datas.name
                    user_data.role = datas.role

                    if(datas.role !== "recruiter"){
                        navigate('/main-screen');
                      }else{navigate('/r-main-screen')}
                    console.log(datas);
                } else {
                    // Handle the error response from the server
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log("Enter Password Again..")
        }
    };

    const handleSelectChange = (event) => {
        setRole(event.target.value);
        // console.log(event.target.value);
      }

    return (
        <div className='signup-main-con'>
            <div className='signup-bg-con'></div>
            <div className='signup-con'>
                <div className='signup-blur-container'>
                    <h1 className='signup-title'>SignUp</h1>
                    <Form onSubmit={handleSubmit} method='POST'>
                        <Form.Group controlId="formBasicRole">
                            <Form.Label id='signup-subheading'>Select Role</Form.Label>
                            <Form.Select onChange={handleSelectChange}
                            name = 'role'
                            type = "role">
                            {/* <select onChange={handleSelectChange}> */}
                                <option value="">-- Select --</option>
                                <option value="applicant">Job Applicant</option>
                                <option value="recruiter">Job Recruiter</option>
                            {/* </select> */}

                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label id='signup-subheading'>Name</Form.Label>
                            <Form.Control
                                type="name"
                                name='name'
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label id='signup-subheading'>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label id='signup-subheading'>Enter Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Form.Label id='signup-subheading'>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='password2'
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className='signup-bottom-con'>
                            <button name='signup' className="signup-btn" >Sign up</button>
                            <div className='signup-bottom-text'>
                                <p>
                                    Already have an account? <Link to="/">LogIn</Link>
                                </p>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;