import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import Column from "./Column";
import { ITask } from "../interfaces/task";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";


const TaskBoard:React.FC = () => {
    const { tasks, updateTask, createTask, deleteTask, getTasks } = useTasks();
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.token) {
            getTasks(user.token);
        }
    }, [user]);

    const handleDragStart = (taskId: string) => {
        setDraggedTaskId(taskId);
    }

    const handleDrop = async(event: React.DragEvent<HTMLDivElement>, newStatus: string) => {
        event.preventDefault();
        if(draggedTaskId){
            const task = tasks.find((task) => task._id === draggedTaskId);
            if(task){
                await updateTask(draggedTaskId, { ...task, status: newStatus });
                setDraggedTaskId(null);
            }
        }
    }

    const handleCreateTask = async(task: ITask) => {
        await createTask(task);
    }

    const handleUpdateTask = async(task: ITask) => {
        await updateTask(task._id!, task);
    }

    const handleDeleteTask = async(taskId: string) => {
        await deleteTask(taskId);
    }

    const columns = ['To-Do', 'In Progress', 'Under Review', 'Completed'];

    return(
        <>
          <div className="taskboard-container">
                <Header />
                
                <div className="filter-container">
                    <div className="searchBx">
                    <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Search task..." className="input-search"/>
                    </div>
                </div>

                <div className="columns">
                {columns.map((status) => (
                    <Column 
                        key={status}
                        status={status}
                        tasks={tasks.filter((task) => task.status === status)}
                        onDrop={handleDrop}
                        onDragStart={handleDragStart}
                        onCreateTask={handleCreateTask}
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                    />
                ))}
                </div>
            </div>
        </>
    )
}

export default TaskBoard;