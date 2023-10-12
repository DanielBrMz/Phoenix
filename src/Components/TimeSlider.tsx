import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

const Timeslider = (): JSX.Element => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }));
      setCurrentDate(now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-4/5 h-[7rem] bg-[#222] flex flex-col justify-end items-center ">
      <div className="flex items-center space-x-4">
        <div>
          <button><FontAwesomeIcon icon={faBackward} color="white" /></button>
          <button><FontAwesomeIcon icon={faPlay} color="white" /></button>
          <button><FontAwesomeIcon icon={faForward} color="white" /></button>
        </div>
        <div className="text-white">{currentTime}</div>
        <div className="text-white">{currentDate}</div>
      </div>
      <div className="w-full h-[2rem] bg-[#111] z-1 mt-4"></div>
    </div>
  );
};

export default Timeslider;
