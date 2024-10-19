import React, { useEffect, useState } from 'react';

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="date-time-display">
      <h5>{currentDateTime.toLocaleString('en-IN')}</h5>
    </div>
  );
};

export default DateTimeDisplay;
