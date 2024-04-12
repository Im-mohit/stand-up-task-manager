import { useState } from 'react';
import TaskList from './components/taskList';
import Timer from './components/timer';
import TaskCard from './components/taskCard';
export default function DailyTaskPlaner() {

    const defaultTime = '00:00'; // Set a default timer value
    const newTask = {
       name: 'New Task', // Default task name
       timer: defaultTime // Default timer value
    };
    const [currentTask, setCurrentTask] = useState(newTask);
    const [taskList, setTaskList] = useState([]);


    function updateTask(index, task) {
        const updatedTaskList = [...taskList];
        updatedTaskList[index] = task;
        setTaskList(updatedTaskList);
    }

    function updateCurrentTask(task) {
        console.log("Updated current task");
        setCurrentTask(task);
    }

    function addTask(task) {
        const newTaskList = [...taskList, task];
        setTaskList(newTaskList);
    }

    function removeTask(index) {
        const updatedTaskList = taskList.filter((_, i) => i !== index);
        console.log(updatedTaskList);
        setTaskList(updatedTaskList);
    }


    return (
        <div className="container">
            <div className="leftHalf">
                <TaskList updateTasks={updateTask} updateCurrentTask={updateCurrentTask} addTask={addTask} taskList={taskList} removeTask={removeTask} />
            </div>
            <div className="rightHalf">
                <div className="rightHalfContent">
                <Timer task={currentTask} />
                </div>
            </div>
        </div>
    );

}
