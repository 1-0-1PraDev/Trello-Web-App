import { useState, useEffect } from "react";
import { ITask } from "../interfaces/task";
import Task from "./Task";
import TaskModal from "../modal/TaskModal";
import { IconAdd } from "./Icons";

interface ColumnProps{
    status: string;
    tasks: ITask[];
    onDrop: (event: React.DragEvent<HTMLDivElement>, status: string) => void;
    onDragStart: (taskId: string) => void;
    onCreateTask: (task: ITask) => void;
    onUpdateTask: (task: ITask) => void;
    onDeleteTask: (taskId: string) => void;
}   

const Column: React.FC<ColumnProps> = ({ status, tasks, onDrop, onDragStart, onCreateTask, onUpdateTask, onDeleteTask }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<ITask | null>(null);

    const formatDate = (date: Date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    const handleTaskEdit = (task: ITask) => {
        setEditingTask({
            ...task,
            deadline: task.deadline ? formatDate(new Date(task.deadline)) : ""
        });
        setIsModalOpen(true);
    } 

    const handleCreateTask = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    }

    const handleSaveTask = (task: ITask) => {
        if(editingTask){
            onUpdateTask({...task, status});
        }else{
            onCreateTask(task);
        }
        setIsModalOpen(false);
    }

    useEffect(() => {
        if (!isModalOpen) {
            setEditingTask(null);
        } else {
            // Scroll to top when the modal is opened
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Optional for smooth scrolling
            });
        }
    }, [isModalOpen]);

    return (
        <div
            className="column"
            onDrop={(event) => onDrop(event, status)}
            onDragOver={(event) => event.preventDefault()}
        >
            <h3 className="column-title">{status} <span className="total-task-number">{tasks.length}</span></h3>
           
            <div className="tasks">
                {tasks.map((task) => (
                    <div className="task-wrapper" key={task._id}>
                        {/* Show tasks here */}
                        <Task task={task} onDragStart={onDragStart} />
                        <div className="btnsBx">
                            <button className="btn btn-secondary" onClick={() => handleTaskEdit(task)}>Edit</button>
                            <button className="btn btn-tertiary" onClick={() => onDeleteTask(task._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={handleCreateTask} className="btn btn-primary" style={{display: 'flex '}}>
                <IconAdd />
                <span>Create Task</span>
            </button>

            {/* Taskmodal */}
            <TaskModal 
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                onSave={handleSaveTask}
                task={editingTask}
            />
        </div>
    );
};

export default Column;