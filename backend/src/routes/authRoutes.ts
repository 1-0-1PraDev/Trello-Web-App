import express from 'express';
import { registerUser, authUser, getUser, updateProfile } from '../controllers/authController';
import { authMiddlware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/get', authMiddlware, getUser);
router.put('/update', authMiddlware, updateProfile);

export default router;