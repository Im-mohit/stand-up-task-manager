import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = ({ task }) => {
  const [time, setTime] = useState(task.timer);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId;
    if (task.timer !== '00:00') {
      const [hours, minutes] = task.timer.split(':').map(Number);
      let totalSeconds = hours * 3600 + minutes * 60;

      intervalId = setInterval(() => {
        if (!isPaused) {
          totalSeconds--;
          if (totalSeconds < 0) {
            clearInterval(intervalId);
            setTime('00:00:00');
          } else {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            setTime(formattedTime);
          }
        }
      }, 1000);

    }

    return () => clearInterval(intervalId);
  }, [task.timer, isPaused]);


// Inside the Timer.js component

const generateTaskListFile = (startedTasks) => {
  // Create a plain text content from the started tasks
  console.log("caaked");
  const content = startedTasks.map((task) => `${task.name}: ${task.timer}`).join('\n');

  // Create a Blob object containing the text
  const blob = new Blob([content], { type: 'text/plain' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');
  link.href = url;
  link.download = 'started_tasks.txt';

  // Append the link to the document body
  document.body.appendChild(link);

  // Programmatically click the link to trigger the download
  link.click();

  // Remove the link from the document body
  document.body.removeChild(link);

  // Revoke the URL to release the resources
  URL.revokeObjectURL(url);
};

  const handlePause = () => {
    console.log(time);
    const [hours, minutes] = task.timer.split(':').map(Number);

    task.timer = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    setIsPaused(!isPaused);
  };

  return (
    <div className="rightHalfContent">
      <div className="taskName">{task.name}</div>
      <div className="timer">{time}</div>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
};

export default Timer;
