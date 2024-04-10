import { User } from '@prisma/client';
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../../prisma/client';
import encrypter from '../common/encrypter';
import auth, { AuthRequest } from '../middleware/auth';

const schema = z.object({
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z.string()
});

const router = Router();

router.post('/register', async (request: Request, response: Response) => {
    const body = request.body as User;
    const validation = schema.safeParse(body);
    if (!validation.success) return response.status(400).send(validation.error.format());

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) return response.status(400).send('Email is already taken');

    body.password = await encrypter(body.password);

    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    });

    if (!process.env.JWT_PRIVATE_KEY) throw Error('JWT_PRIVATE_KEY is not defined');

    const token = await jwt.sign({ id: newUser.id }, process.env.JWT_PRIVATE_KEY!);

    response.header('Authorization', 'Bearer ' + token).send({ id: newUser.id, email: newUser.email });
});

router.get('/me', auth, async (request: AuthRequest, response: Response) => {
    const id = request.user?.id;
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) return response.status(404).send('User not found.');

    response.send({ id: user.id, email: user.email });
});

export default router;