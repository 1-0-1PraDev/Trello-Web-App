import { useState, useEffect } from "react";
import { ITask } from "../interfaces/task";
import "../styles/taskmodal.css";

interface TaskModalProps {
  isOpen: boolean;
  onSave: (task: ITask) => void;
  task?: ITask | null;
  onRequestClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
    onSave,
  onRequestClose,
  task,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To-Do");
  const [priority, setPriority] = useState(task?.priority || "Low");
  const [deadline, setDeadline] = useState<string>(task?.deadline ? new Date(task.deadline).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status || "To-Do");
      setPriority(task.priority || "Low");
      setDeadline(task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]);
    } else{
      setTitle("");
      setDescription("");
      setStatus("To-Do");
      setPriority("Low");
      setDeadline(new Date().toISOString().split("T")[0]);
    }
  }, [task]);

  const handleSave = () => {
    const newTask = {
      _id: task?._id || "",
      title,
      description,
      status: status || "To-Do",
      priority: priority || "Low",
      deadline: deadline ? String(new Date(deadline)) : "",
    };

    onSave(newTask);
      // Reset fields for new task creation
      setTitle("");
      setStatus("To-Do");
      setDescription("");
      setPriority("Low");
      setDeadline(new Date().toISOString().split("T")[0]);
      onRequestClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div
            className="modal"
          >
            <h2 className="modal-title">
              {task ? "Edit Task" : "Create Task"}
            </h2>
            <div className="inputBx">
              <label htmlFor="">Title: </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="inputBx">
              <label htmlFor="">Description: </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="inputBx direction-row">
              <div>
                <label htmlFor="">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Priority: </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="inputBx">
              <label htmlFor="">Deadline:</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="btnBx">
              <button onClick={onRequestClose} className="btn btn-secondary">Cancel</button>

              <button onClick={handleSave} className="btn btn-quaternary">
                {task ? "Save Changes" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
