import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// will call controller func
router.post('/', UserControllers.createUser );
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateAUser);
router.delete('/:userId', UserControllers.deleteASingleUser);


export const UsersRoute = router;