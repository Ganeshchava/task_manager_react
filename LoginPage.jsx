import React, { useState } from 'react';
import './App.css'; // Assuming you have a CSS file

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      // Allow login for any email/password combination
      onLoginSuccess(); // Call the success handler
    } else {
      setErrorMessage('Please enter both email and password.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin(); // Trigger login on 'Enter' key press
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="input-field"
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="input-field"
          onKeyPress={handleKeyPress}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="forgot-password">Forgot Password?</p>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
