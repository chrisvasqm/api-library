import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: User;
}

const auth = (request: AuthRequest, response: Response, next: NextFunction) => {
    const header = request.header('Authorization');
    const token = header?.split(' ')[1];
    if (!token) return response.status(401).send('Access denied. Must provide a token');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY!);
        request.user = decoded as User;
        next()
    } catch (error) {
        response.status(400).send('Invalid token');
    }
}

export default auth;