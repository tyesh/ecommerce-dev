import express from 'express';
import { authUser } from '../controllers/userController.js';
const router = express.Router();

router.route('/login').get(authUser);

export default router;
