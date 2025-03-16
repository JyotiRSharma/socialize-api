import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { signIn, signUp } from './handlers/user';
import {
    validateUniqueUsername,
    handleValidationErrors,
    validateSignIn,
} from './modules/validations';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', protect, router);

app.post('/signUp', validateUniqueUsername, handleValidationErrors, signUp);
app.post('/signIn', validateSignIn, handleValidationErrors, signIn);

export default app;
