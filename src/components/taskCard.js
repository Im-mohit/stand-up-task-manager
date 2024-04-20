import React, { useState } from 'react';

const TaskCard = ({ updateTaskCard, index, task, onStart, remove }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [completed, setCompleted] = useState(false);

  const handleStart = () => {
    const newTask = {
        id : task.id,
        name : taskName,
        timer : `${hours}:${minutes}:${seconds}`,
        status : "STARTED"
    }
    onStart(task.id, newTask);
  };

  const handleHourChange = (event) => {
    const newHours = event.target.value;
    setHours(newHours);
  };

  const handleMinuteChange = (event) => {
    const newMinutes = event.target.value;
    setMinutes(newMinutes);
  };

   const handleSecondsChange = (event) => {
    const newSeconds = event.target.value;
    setSeconds(newSeconds);
  };

  const removeCard = () => {
    remove(index);
  };



  const completeCard = () => {
      const newTask = {
          id : task.id,
          name : taskName,
          timer : task.timer,
          status : "COMPLETED"
      }
    updateTaskCard(task.id, newTask);
  };

  const saveCard = () => {
    setCompleted(true);
    const newTask = {
        id : task.id,
        name : taskName,
        timer : `${hours}:${minutes}:${seconds}`,
        status : "CREATED"
    }
    updateTaskCard(task.id, newTask);
  };

  return (
    <div className="task-card">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        disabled={completed}
        placeholder="Task Name"
        className="task-name-input"
      />
      <div className="time-selection">
        <select value={hours} onChange={handleHourChange} disabled={completed} className="hour-select">
          {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
        <select value={minutes} onChange={handleMinuteChange} disabled={completed} className="minute-select">
          {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((minute) => (
            <option key={minute} value={minute}>{minute}</option>
          ))}
        </select>
        <select value={seconds} onChange={handleSecondsChange} disabled={completed} className="second-select">
          {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map((second) => (
            <option key={second} value={second}>{second}</option>
          ))}
        </select>
      </div>
      <div className="button-group">
        {completed && <button onClick={handleStart} className="start-button">Start</button>}
        {completed && <button onClick={removeCard} className="remove-button">Remove</button>}
        {completed && <button onClick={completeCard} className="remove-button">Complete</button>}
        {!completed && <button onClick={saveCard} className="create-button">Submit</button>}
      </div>
      <div style = {{margin : '10px'}}>
        <b> Time pending : {task.timer} </b>
      </div>
    </div>
  );
};

export default TaskCard;
