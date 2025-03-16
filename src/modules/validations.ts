import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import prisma from './db';
import { comparePasswords } from './auth';

export const validateUniqueUsername = body('username').custom(async (value) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            username: value,
        },
    });
    if (existingUser) {
        throw new Error(
            'Username already exists. Please choose a different username.',
        );
    }
    return true;
});

export const validateSignIn = [
    body('username').notEmpty(),
    body('password').notEmpty(),
    body().custom(async (_, { req }) => {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            },
        });
        
        if (!user) {
            throw new Error('Invalid username or password');
        }

        const isValidPassword = await comparePasswords(req.body.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid username or password');
        }

        return true;
    })
];

export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() });
        return;
    }
    next();
}; 