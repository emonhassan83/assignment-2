import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// will call controller func
router.post('/', UserControllers.createUser );
router.get('/', UserControllers.getAllUsers);


export const UsersRoute = router;