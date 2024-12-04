import React, { useState, useEffect } from 'react';
import { getTasks, addTask, deleteTask, updateTask } from './services/api';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState({ id: null, name: "", is_completed: false });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleAddTask = async () => {
        if (newTask.trim() !== "") {
            const task = await addTask({ name: newTask, is_completed: false });
            setTasks([...tasks, task]);
            setNewTask("");
        }
    };

    const handleDeleteTask = async (taskId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    };

    const handleEditInputChange = (event) => {
        setCurrentTask({ ...currentTask, name: event.target.value });
    };

    const handleEditTask = (task) => {
        setIsEditing(true);
        setCurrentTask(task);
    };

    const handleUpdateTask = async () => {
        const updatedTask = await updateTask(currentTask);
        setTasks(tasks.map(task => (task.id === currentTask.id ? updatedTask : task)));
        setIsEditing(false);
        setCurrentTask({ id: null, name: "", is_completed: false });
    };

    return (
        <div className='to-do-list'>
            <h1>To-do List</h1>
            <div>
                <input
                    type='text'
                    placeholder='Enter a task'
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={handleAddTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task) =>
                    <li key={task.id}>
                        <span className='text'>{task.name}</span>
                        <button className="edit-button" onClick={() => handleEditTask(task)}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                    </li>
                )}
            </ol>
            {isEditing && (
                <div>
                    <input
                        type='text'
                        placeholder='Edit task'
                        value={currentTask.name}
                        onChange={handleEditInputChange}
                    />
                    <button className="update-button" onClick={handleUpdateTask}>
                        Update
                    </button>
                </div>
            )}
        </div>
    );
}

export default TodoList;
