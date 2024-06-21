import { useState } from 'react';
import TaskList from './components/taskList';
import Timer from './components/timer';
import TaskCard from './components/taskCard';
import Header from './common/Header';

export default function DailyTaskPlanner() {
    const defaultTime = '00:00:00';
    const newTask = {
       name: 'New Task',
       timer: defaultTime,
       status: 'NOT_CREATED'
    };
    const [currentTask, setCurrentTask] = useState(newTask);
    const [taskList, setTaskList] = useState([]);

    function updateTask(index, task) {
        const updatedTaskList = [...taskList];
        updatedTaskList[index] = task;
        setTaskList(updatedTaskList);
    }

    function updateCurrentTask(task) {
        setCurrentTask(task);
    }

    function addTask(task) {
        const newTaskList = [...taskList, task];
        setTaskList(newTaskList);
    }

    function removeTask(index) {
        const updatedTaskList = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTaskList);
    }

    return (
        <div className="container">
            <Header />
            <div className="leftHalf">
                <TaskList
                    updateTasks={updateTask}
                    updateCurrentTask={updateCurrentTask}
                    addTask={addTask}
                    taskList={taskList}
                    removeTask={removeTask}
                />
            </div>
            <div className="rightHalf">
                <div className="rightHalfContent">
                    <Timer
                        task={currentTask}
                        updateTask = {updateCurrentTask}
                    />
                </div>
            </div>
        </div>
    );
}
