import React, { useState } from "react";
import './forgotpassword.css'
// import { useNavigate } from "react-router-dom";
// import { Toast } from "react-bootstrap";

function ForgotPassword() {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendLink = async (e) => {
    e.preventDefault();
    // console.log(email)
    const res = await fetch ("/user/sendpasswordLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email})
    });

    const data = await res.json();

    if(data.status === 201){
      setEmail("");
      setMessage(true)
    }else{
      console.log("Invalid User");
    }
  }

  return (
    <div className="forgotpassword-main-container">
        <div className= "forgotpassword-blur-container">
      <h1 className="main-title">Forgot Password</h1>
      {message ? <p style={{fontWeight:"bold"}}>Password reset link successfully to you via email</p>:""}
      <form>
        <div className="forgotpassword-subheading">
        <label className="fg-lable" >Email</label>
          <input
          className="input-box"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
        <button className='submit-btn' onClick={sendLink}>Send</button>
      </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
