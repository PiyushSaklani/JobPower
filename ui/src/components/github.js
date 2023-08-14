import React, { useEffect, useState } from 'react';
import GitHubLogin from 'react-github-login';
import { useNavigate } from 'react-router-dom';
import { data } from './const';

const GitHubBtn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const onSuccess = (res) => {
    console.log("Login Success! Response: ", res);
    setUser(res.profileObj && res.profileObj.name);
    navigate("/dashboard");
  };

  const onFailure = (res) => {
    console.log("Login Failed! res: ", res);
    setUser(null);
    navigate("/");
  };

  const renderButton = ({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className='btn-login'>
      <span>GitHub</span>
    </button>
  );

  useEffect(() => {
    data.user = user;
  }, [user]);

  return (
    <GitHubLogin
      className="btn-login"
      clientId="3584ebcb02e8bbe0ba8b"
      onSuccess={onSuccess}
      onFailure={onFailure}
      redirectUri="http://localhost:3000/callback"
      scope="user"
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      render={renderButton}
    >
      GitHub
    </GitHubLogin>
  );
};

export default GitHubBtn;