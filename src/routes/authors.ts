import { Router, Request, Response } from 'express';
import prisma from '../../prisma/client'

const router = Router();

router.get('/', async (_: Request, response: Response) => {
    const authors = await prisma.author.findMany();
    response.send(authors);
});

export default router;
