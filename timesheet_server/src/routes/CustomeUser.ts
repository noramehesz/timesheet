import { Router } from 'express';
import UserController from '../controller/UserController';

const router = Router();

router.post('/', UserController.createUser)

router.get('/:id', UserController.getUserById);

router.get('/', UserController.getUsers);

router.delete('/:id', UserController.deleteUserById);

router.put('/', UserController.updateUser);

export default router;