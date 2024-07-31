import express from 'express';
import { authMiddlware } from '../middleware/authMiddleware';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/taskController';

const router = express.Router();

router.get('/all', authMiddlware, getAllTasks);
router.post('/create', authMiddlware, createTask);
router.put('/:id', authMiddlware, updateTask);
router.delete('/:id', authMiddlware, deleteTask);

export default router;