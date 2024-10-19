// Notification.jsx
import React from 'react';
import './Notification.css'; // Create a CSS file for styles

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      {message}
      <button onClick={onClose} className="close-btn">x</button>
    </div>
  );
};

export default Notification;
