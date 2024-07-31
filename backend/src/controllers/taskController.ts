import { Request, Response } from "express"
import Task from "../models/Task";
import { IUser } from "../models/User";

interface authRequest extends Request{
    user?: IUser
}

export const createTask = async(req: authRequest, res: Response) => {
    const { title, description, status, priority, deadline } = req.body;

    try{
        if(req.user){
            const task = new Task({
                user: req.user._id,
                title,
                description,
                status,
                priority,
                deadline 
            });

            const createdTask = await task.save();
            res.status(201).json({
                message: 'Task Created Successfully',
                success: true,
                task: createdTask
            });
        }   
    }catch(err){
        res.status(400).json({
            success: false,
            message: (err as Error).message
        });
    }
}   

export const getAllTasks = async(req: authRequest, res: Response) => {
    try{
        const tasks = await Task.find({
            user: req.user?._id
        });
        res.status(200).json({
            success: true,
            tasks
        });
    }catch(err){
        res.status(400).json({
            success: false,
            message: (err as Error).message
        });
    }
}

export const updateTask = async(req: Request, res: Response) => {
    try{
        const task = await Task.findById(req.params.id);
        if(task){
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.status = req.body.status || task.status;
            task.priority = req.body.priority || task.priority;
            task.deadline = req.body.deadline || task.deadline;

            const updatedTask = await task.save();
            res.status(200).json({
                success: true,
                message: "Task updated Successfully",
                task: updatedTask
            });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }catch(err){
        res.status(400).json({
            success: false,
            message: (err as Error).message
        });
    }
}

export const deleteTask = async(req: authRequest, res: Response) => {
    try{
        const task = await Task.findById(req.params.id);

        if(task?.user.toString() !== req.user?._id?.toString()){
            return res.status(401).json({ 
                message: 'Not authorized',
                success: false
            });
        }

        if(task){
            await Task.deleteOne({ _id: req.params.id });
            res.status(200).json({
                success: true,
                message: "Task Deleted Successfully"
            });
        }else {
            res.status(404).json({ message: 'Task not found' });
        }
    }catch(err){
        res.status(400).json({
            success: false,
            message: (err as Error).message
        });
    }
}