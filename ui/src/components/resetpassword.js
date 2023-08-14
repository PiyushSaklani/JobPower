import React, { useState, useEffect } from "react";
import './resetpassword.css'
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  // const navigate = useNavigate()
  // const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Validate the user's new password and confirm password
  //   if (passwords.newPassword !== passwords.confirmPassword) {
  //     // Display an error message
  //     return;
  //   }else{
  //     navigate("/")
  //   }
  // Make a request to your server to reset the user's password using the user's new password
  // Display a success message or an error message

  const { id, token } = useParams();
  // const prams = useParams();
  // console.log(prams)

  const history = useNavigate();

  const [data2, setData] = useState(false);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [message, setMessage] = useState("");

  // const userValid = async () => {
  //   const res = await fetch(`/user/resetpassword/${id}/${token}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });

  //   const data = await res.json()

  //   if (data.status == 201) {
  //     console.log("user valid")
  //   } else {
  //     history("*")
  //   }
  // }

  const sendPassword = async (e) => {
    e.preventDefault();

    if (password === "") {
      console.log("password is required!");
    } else if (password.length <= 6) {
      console.log("password must be 6 char!");
    } else if (password === password2) {
      const res = await fetch(`/user/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const data = await res.json()

      if (data.status === 201) {
        setPassword("")
        // setMessage(true)
        history('/')
      } else {
        console.log("Token Expired generate a new Link")
      }
    }
  }

  // const loginpage = () => {
  //   const navigate = useNavigate();
  //   navigate('/login')
  // }

  useEffect(() => {
    // userValid()
    setTimeout(() => {
      setData(true)
    }, 3000)
  }, [])

  return (
    <div className="reset-main-container">
      <div className="reset-blur-container">
        <h1 className="reset-title">Reset Password</h1>
        {message ? <p style={{ fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}
        <form>
          <div className="reset-subheading">
            <label className="rs-lable">New Password</label>
            <div>
              <input
                type="password"
                name="password"
                className="rsp-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block" }}
              />
            </div>
          </div>
          <div className="reset-subheading">
            <label className="rs-lable">Confirm Password</label>
            <div>
              <input
                type="password"
                name="password2"
                className="rsp-input"
                placeholder="Confirm"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                style={{ display: "block" }}
              />
            </div>
          </div>
          <button className="reset-btn" onClick={sendPassword}>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
