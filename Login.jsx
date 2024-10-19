import React, { useState } from 'react';
import './App.css'; // Import the CSS styles

const Login = ({ onLoginSuccess }) => {
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
    // Allow any random email and password
    if (email.trim() && password.trim()) {
      onLoginSuccess(); // Proceed to the next step if email and password are entered
    } else {
      setErrorMessage('Please enter a valid email and password.');
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
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
