import axios from "axios";
import { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK } from "../actionTypes";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchTasks = (token) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/tasks`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                }
            );
            dispatch({ type: GET_TASKS, payload: response.data });
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };
};

export const addTask = (formData, token) => {
    const config = {
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
    };
    return async (dispatch) => {
        try {
            await axios.post(`${apiUrl}/api/tasks`, formData, config);
            dispatch(fetchTasks(token));
            toast.success("Task added successfully");
        } catch (error) {
            toast.error("Failed to add task");
            console.error("Failed to add task:", error);
        }
    };
};

export const updateTask = (id, data, token) => {
    const config = {
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
    };
    return async (dispatch) => {
        try {
            await axios.patch(`${apiUrl}/api/tasks/${id}`, data, config);
            dispatch(fetchTasks(token));
            toast.success("Task updated successfully");
        } catch (error) {
            toast.error("Failed to update task");
            console.error("Failed to update task:", error);
        }
    };
};

export const deleteTask = (id, token) => {
    const config = {
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
    };
    return async (dispatch) => {
        try {
            await axios.delete(`${apiUrl}/api/tasks/${id}`, config);
            dispatch(fetchTasks(token));
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Failed to delete task");
            console.error("Failed to delete task:", error);
        }
    };
};
