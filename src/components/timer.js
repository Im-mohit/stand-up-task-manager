import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = ({ task, updateTask }) => {
  const [time, setTime] = useState(task.timer);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsPaused(false);
  }, [task.name]);

  useEffect(() => {
    let intervalId;
    setTime(task.timer);
    if (task.timer !== '00:00:00') {
      const [hours, minutes, seconds] = task.timer.split(':').map(Number);
      let totalSeconds = hours * 3600 + minutes * 60 + seconds;

      intervalId = setInterval(() => {
        if (!isPaused) {
          totalSeconds--;
          if (totalSeconds < 0) {
            clearInterval(intervalId);
            setIsPaused(true);
            setTime('00:00:00');
          } else {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            setTime(formattedTime);
            task.timer = formattedTime;
            updateTask(task);
          }
        }
      }, 1000);

    }

    return () => clearInterval(intervalId);
  }, [task, isPaused]);

  const handlePause = () => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    task.timer = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    setIsPaused(!isPaused);
    updateTask(task);
  };

  return (
    <div className="rightHalfContent">
      <div className="taskName">{task.name}</div>
      <div className="timer">{time}</div>
      <button className={`timer-button ${!isPaused ? 'pause-button' : 'resume-button'}`} onClick={handlePause}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
};

export default Timer;
