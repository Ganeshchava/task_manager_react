import React, { useState } from 'react';
import TaskBoard from './TaskBoard.jsx';
import DateTimeDisplay from './DateTimeDisplay.jsx';
import './styles.css'; // Include your CSS file

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showBoard, setShowBoard] = useState(false);
  const [showModal, setShowModal] = useState(true); // Modal state

  const handleEnter = () => {
    if (email.trim() && password.trim()) {
      setShowBoard(true);
      setShowModal(false); // Hide modal after login
    }
  };

  return (
    <div className="app">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Login</h2>
            {/* Minimal information as per your request */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="input-field"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="input-field"
            />
            <button className="enter-button" onClick={handleEnter}>
              Enter
            </button>
          </div>
        </div>
      )}

      {showBoard && (
        <div className="task-manager">
          <div className="header">
            <h3>Welcome!</h3>
            <DateTimeDisplay />
          </div>
          <TaskBoard email={email} />
        </div>
      )}
    </div>
  );
}

export default App;
