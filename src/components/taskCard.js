// TaskCard.js
import React, { useState } from 'react';

const TaskCard = ({updateTaskCard, index, task, onStart, remove }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [taskTimer, setTaskTimer] = useState(task.timer);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [completed, setCompleted] = useState(false);

    const handleStart = () => {
        onStart(task);
    };
  const handleHourChange = (event) => {
    const newHours = event.target.value;
    setHours(newHours);
  };

  const handleMinuteChange = (event) => {
    const newMinutes = event.target.value;
    setMinutes(newMinutes);
  };

  const updateTaskTimer = (newHours, newMinutes) => {
    const formattedHours = newHours.padStart(2, '0');
    const formattedMinutes = newMinutes.padStart(2, '0');
    const newTimer = `${formattedHours}:${formattedMinutes}`;
  };

    const removeCard = () => {
      remove(index);
    };

    const saveCard = () => {
        setCompleted(true);

        updateTaskTimer(hours, minutes);

        const newTask = {
            id : task.id,
            name : taskName,
            timer : `${hours}:${minutes}`
        }
        updateTaskCard(task.id, newTask);
    }


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
    </div>
    <div className="button-group">
      {completed && <button onClick={handleStart} className="start-button">Start</button>}
      {completed && <button onClick={removeCard} className="remove-button">Remove</button>}
      {!completed && <button onClick={saveCard} className="create-button">Create Task</button>}
    </div>
    </div>
  );
};

export default TaskCard;
