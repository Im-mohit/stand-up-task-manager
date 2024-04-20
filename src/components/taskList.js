// TaskList.js
import React from 'react';
import { useState } from 'react';
import TaskCard from './taskCard';
import Timer from './timer';

const TaskList = ({ updateTasks, updateCurrentTask, addTask, removeTask, taskList }) => { // Destructuring props properly

  const [isCreatingTask, setIsCreatingTask] = useState(false);

  console.log("TaskList received taskList:", taskList);

  const createTask = () => {
     const defaultTime = '00:00:00'; // Set a default timer value
      const newTask = {
        id: taskList.length,
        name: 'New Task', // Default task name
        timer: defaultTime // Default timer value
      };
      setIsCreatingTask(true);
      addTask(newTask);
  };

  const deleteTask = (index) => {
    console.log(index);
    removeTask(index);
  }

    const startTask = (index, task) => {
      // Add the task to the list of started tasks
      updateTasks(index, task);
      updateCurrentTask(task);
    };

  const updateTask = (index, task) => {
        updateTasks(index, task);
        setIsCreatingTask(false);
  }

  const generateTaskListFile = () => {
  // Create a plain text content from the started tasks
  const prevTasks = taskList
     .filter(task => task.status === "STARTED" || task.status === "COMPLETED") // Filter tasks by status
     .map(task => {
      if (task.status === "COMPLETED") {
        return `- [Completed] ${task.name}`;
      } else {
        return `- ${task.name}`;
      }
    }).join('\n');

  const planTasks = taskList
       .filter(task => task.status !== "COMPLETED") // Filter tasks by status
       .map(task => `- ${task.name}`) // Format task names as bullets
       .join('\n');

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
        task.status !== 'COMPLETED' && (
        <div>
            <TaskCard updateTaskCard={updateTask} key={task.id} index={index} task={task} onStart={startTask} remove={deleteTask}/>
        </div>
        )))}
      <button
            className = "lets-create-task-button"
            onClick={createTask}
            disabled={isCreatingTask}>
            Create Task
    </button>
    <button className = "generate-task-file" onClick={generateTaskListFile}>Generate Standup Updates</button>
    </div>
  );
};

export default TaskList;
