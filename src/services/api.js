import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${API_URL}${taskId}/`);
    } catch (error) {
        console.error("Error deleting task:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateTask = async (task) => {
    try {
        const response = await axios.put(`${API_URL}${task.id}/`, task);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error.response ? error.response.data : error.message);
        throw error;
    }
};
