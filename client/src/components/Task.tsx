import React from "react";
import '../styles/task.css';
import { IconClock } from "./Icons";

interface TaskProps {
    task: {
        _id: string;
        title: string;
        description?: string;
        status: string;
        priority?: string;
        deadline?: string 
    };
    onDragStart: (taskId: string) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDragStart }) => {
    return(
        <div
            draggable
            onDragStart={() => onDragStart(task._id)}
            className="task"
        >
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description}</p>
            <span 
                className={`tag 
                        ${task.priority === 'Low' ? 'tag-low' : ''} 
                        ${task.priority === 'Medium' ? 'tag-medium' : ''}
                        ${task.priority === 'Urgent' ? 'tag-urgent' : ''}
                    `}
                >
                {task.priority}
            </span>
            <div className="task-deadline">
                <IconClock />
                {task.deadline && (
                    <p className="deadline">{String(task.deadline).split("T")[0]}</p>
                )}
            </div>
        </div>
    )
}

export default Task;