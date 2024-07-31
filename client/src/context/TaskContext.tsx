import axios from "axios";
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { ITask } from "../interfaces/task";
import { toast } from 'react-toastify';


interface TaskContextProps{
    tasks: ITask[];
    createTask: (task: ITask) => Promise<void>;
    updateTask: (id: string, task: ITask) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    getTasks: (token: string) => Promise<void>; 
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);
const BACKEND_URL = "https://trello-web-app-backend.onrender.com";

export const TaskProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setToken(parsedUserInfo?.token || "");
        }
    }, [])
    
    const createTask = async(task: ITask) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/task/create`, task, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); 
            setTasks(prevTasks => [...prevTasks, response.data.task]);
            toast.success("Task created successfully!");   
        } catch (error) {
            console.error('Creating task failed:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    toast.error(`Failed to create task: ${error.response.data.message}`);
                } else if (error.request) {
                    toast.error("Failed to create task: No response from server. Please try again.");
                } else {
                    toast.error(`Failed to create task: ${error.message}`);
                }
            } else {
                toast.error("Failed to create task. Please try again.");
            }
        }
    }

    const updateTask = async(id: string, task: ITask) => {
        try {
            const { data } = await axios.put(`${BACKEND_URL}/api/v1/task/${id}`, task, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); 
            setTasks((prevTasks) => prevTasks.map((task) => task._id === data.task._id ? data.task : task));
            toast.success("Task updated successfully!");  
        } catch (error) {
            console.error('Updating task failed:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    toast.error(`Failed to update task: ${error.response.data.message}`);
                } else if (error.request) {
                    toast.error("Failed to update task: No response from server. Please try again.");
                } else {
                    toast.error(`Failed to update task: ${error.message}`);
                }
            } else {
                toast.error("Failed to update task. Please try again.");
            }
        }
    }   

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/task/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },  
            });
            setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
            toast.success("Task deleted successfully!");
        } catch (error) {
            console.error('Deleting task failed:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    toast.error(`Failed to delete task: ${error.response.data.message}`);
                } else if (error.request) {
                    toast.error("Failed to delete task: No response from server. Please try again.");
                } else {
                    toast.error(`Failed to delete task: ${error.message}`);
                }
            } else {
                toast.error("Failed to delete task. Please try again.");
            }
        }
    };

    const getTasks = async (token: string) => {
        try {
            const { data } = await axios.get(`${BACKEND_URL}/api/v1/task/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(data.tasks);
        } catch (error) {
            console.error('Fetching tasks failed:', error);
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    toast.error(`Failed to fetch tasks: ${error.response.data.message}`);
                } else if (error.request) {
                    toast.error("Failed to fetch tasks: No response from server. Please try again.");
                } else {
                    toast.error(`Failed to fetch tasks: ${error.message}`);
                }
            } else {
                toast.error("Failed to fetch tasks. Please try again.");
            }
        }
    };

    return(
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, getTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => {
    const context = React.useContext(TaskContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}