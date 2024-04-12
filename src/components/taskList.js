// TaskList.js
import React from 'react';
import { useState } from 'react';
import TaskCard from './taskCard';
import Timer from './timer';

const TaskList = ({ updateTasks, updateCurrentTask, addTask, removeTask, taskList }) => { // Destructuring props properly

  const [startedTasks, setStartedTasks] = useState([]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  console.log("TaskList received taskList:", taskList);

  const createTask = () => {
     const defaultTime = '00:00'; // Set a default timer value
      const newTask = {
        id: taskList.length,
        name: 'Newask', // Default task name
        timer: defaultTime // Default timer value
      };
      setIsCreatingTask(true);
      addTask(newTask);
  };

  const deleteTask = (index) => {
    console.log(index);
    removeTask(index);
  }

    const startTask = (task) => {
      // Add the task to the list of started tasks
      setStartedTasks([...startedTasks, task]);
      updateCurrentTask(task);
    };

  const updateTask = (index, task) => {
        updateTasks(index, task);
        setIsCreatingTask(false);
  }

  const generateTaskListFile = () => {
  // Create a plain text content from the started tasks
  console.log(startedTasks);
  const prevTasks = startedTasks
    .map((task, index) => `${index + 1}. ${task.name}`) // Format task names as bullets
    .join('\n'); // Join the tasks with new lines
  const planTasks = taskList
    .map((task, index) => `${index + 1}. ${task.name}`) // Format task names as bullets
    .join('\n'); // Join the tasks with new lines

  const fileContent = `Prev :\n${prevTasks}\n\nPlan for today :\n${planTasks}`;

  // Create a Blob object containing the text
  const blob = new Blob([fileContent], { type: 'text/plain' });

    // Create a link element to download the file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'task_list.txt';

    // Click the download link to trigger the file download
    downloadLink.click();
};

  return (
    <div style={{ position: 'relative'}}>
      {taskList.map((task, index) => (
        <div>
            <TaskCard updateTaskCard={updateTask} key={task.id} index={index} task={task} onStart={startTask} remove={deleteTask} />
        </div>
      ))}
      <button
            style={{
              position: 'fixed', // Fixed positioning
              top: '1%', // Adjust vertical position
              left: '1%', // Adjust horizontal position
            }}
            onClick={createTask}
            disabled={isCreatingTask}>
            Lets Create Task
    </button>
    <button onClick={generateTaskListFile}>Generate Task List File</button>
    </div>
  );
};

export default TaskList;
