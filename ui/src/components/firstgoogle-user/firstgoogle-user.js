import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Signup.css';
// import background from './project-1.png';
import { useNavigate } from 'react-router-dom';
import * as constants from '../../constants/constants.js';

const First_Google_user = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState('')
    const [message, setMessage] = useState('');

    function add_user_data(user) {
        fetch(`${constants.port_address}add_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // handle success or error response from server
            })
            .catch(error => {
                console.error(error);
                // handle network or server error
            });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        add_user_data({
            name: constants.user_data.name,
            email: constants.user_data.email,
            password: "DummyPassword",
            role: role
        })

        if(role === "recruiter"){
            navigate("/r-main-screen")
        }else{
            navigate("/main-screen")
        }
    }

    const handleSelectChange = (event) => {
        setRole(event.target.value);
        // console.log(event.target.value);
    }

    return (
        <div className='signup-main-con'>
            <div className='signup-bg-con'></div>
            <div className='signup-con'>
                <div className='signup-blur-container'>
                    <h1 className='signup-title'>Welcome</h1>
                    <Form onSubmit={handleSubmit} method='POST'>
                        <Form.Group controlId="formBasicRole">
                            <Form.Label id='signup-subheading'>Select your role</Form.Label>
                            <Form.Select onChange={handleSelectChange}
                                name='role'
                                type="role">
                                {/* <select onChange={handleSelectChange}> */}
                                <option value="">-- Select --</option>
                                <option value="applicant">Job Applicant</option>
                                <option value="recruiter">Job Recruiter</option>
                                {/* </select> */}

                            </Form.Select>
                        </Form.Group>
                        <div className='signup-bottom-con'>
                            <button type="submit" name='signup' className="signup-btn" >Continue</button>
                            <div className='signup-bottom-text'>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default First_Google_user;