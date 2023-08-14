import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { data } from './const';
import { port_address, user_data } from '../constants/constants';
import { useState } from 'react';
import { set } from 'mongoose';

const clientgId = "244873686234-vtvor8q41b9eoe6vu3sdk3cjcer506c2.apps.googleusercontent.com"


function GoogleBtn() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('')

    const onSuccess = async (res) => {
        console.log("Login Scuccess! Current User : ", res.profileObj);
        user_data.name = res.profileObj.name
        user_data.email = res.profileObj.email

        await fetch(`${port_address}check_user/${res.profileObj.email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Error checking user');
              }
            })
            .then((data) => {
                if(data !== false){
                    if(data.role == "applicant"){
                        navigate("/main-screen")
                    }else{
                        navigate("/r-main-screen")
                    }
                }else{
                    navigate("/google_user")
                }
            })
            .catch((error) => {
              console.log(error);
            });
    }

    const onFailure = (res) => {
        console.log("Login Failed! res : ", res)
        navigate("/")
    }

    const renderButton = ({ onClick, disabled }) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className='btn-login-google'
        >
            <span>Google</span>
        </button >
    );

    return (
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientgId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                render={renderButton}
            />
        </div>
    )
}

export default GoogleBtn;