import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserPassword,
  deleteUser
} from '../controllers/userController';

const router = Router();

router.get('/user', getAllUsers);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.put('/user/:id', updateUserPassword);
router.delete('/user/:id', deleteUser);

export default router;
