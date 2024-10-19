import React, { useState } from 'react';
import TaskBoard from './TaskBoard.jsx';
import './styles.css'; // Include your CSS file

function App() {
  const [name, setName] = useState('');
  const [showBoard, setShowBoard] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEnter = () => {
    if (name.trim()) {
      setShowBoard(true);
    }
  };

  return (
    <div className="app">
      {!showBoard && (
        <div className="login-modal">
          <div className="login-box">
            <h2>Login</h2>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Username"
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
            />
            <button onClick={handleEnter} className="login-button">Login</button>
          </div>
        </div>
      )}

      {showBoard && (
        <div className="main-page">
          <TaskBoard name={name} />
        </div>
      )}
    </div>
  );
}

export default App;
