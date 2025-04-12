import express from 'express';
import {isUserAuthenticated, login, logout, register} from '../controllers/authController.js';
import userAuth from '../middlewares/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/isAuth', userAuth, isUserAuthenticated);

export default authRouter;