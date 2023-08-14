import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GitHubLogout } from 'react-github-login';

function GitLogout() {
  localStorage.removeItem('isLoggedIn');
  // do other logout-related tasks
}

function GitLogoutButton() {
  const navigate = useNavigate();

  function handleLogoutSuccess() {
    console.log('Logout Success');
    navigate('/login');
  }

  function handleLogoutFailure() {
    console.log('Logout Failure');
  }

  return (
    <GitHubLogout
      clientId="3584ebcb02e8bbe0ba8b"
      onLogoutSuccess={handleLogoutSuccess}
      onLogoutFailure={handleLogoutFailure}
    >
      Logout
    </GitHubLogout>
  );
}

export default GitLogoutButton;