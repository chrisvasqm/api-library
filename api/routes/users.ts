import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import encrypter from '../common/encrypter';
import auth, { AuthRequest } from '../middleware/auth';
import { createUser, findUser, findUserById } from '../services/usersService';

const schema = z.object({
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z.string()
});

const router = Router();

router.post('/register', async (request, response) => {
    if (!process.env.JWT_PRIVATE_KEY) throw Error('JWT_PRIVATE_KEY is not defined');

    const body = request.body as User;
    const validation = schema.safeParse(body);
    if (!validation.success) return response.status(400).send(validation.error.format());

    const user = await findUser(body.email);
    if (user) return response.status(400).send('Email is already taken');

    body.password = await encrypter(body.password);

    const newUser = await createUser(body.email, body.password);

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_PRIVATE_KEY!);

    response
        .header('Authorization', 'Bearer ' + token)
        .send({ id: newUser.id, email: newUser.email });
});

router.get('/me', auth, async (request: AuthRequest, response) => {
    const id = request.user?.id || 0;
    if (isNaN(id)) return response.status(400).send('User not found');

    const user = await findUserById(id);
    if (!user) return response.status(404).send('User not found');

    response.send({ id: user.id, email: user.email });
});

router.post('/login', async (request, response) => {
    const body = request.body;
    const validation = schema.safeParse(body);
    if (!validation.success) return response.status(400).send(validation.error.format());

    const user = await findUser(body.email);
    if (!user) return response.status(404).send('Email or password invalid');

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) return response.status(400).send('Email or password invalid');

    const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY!);

    response.send({ token: token })
})

export default router;