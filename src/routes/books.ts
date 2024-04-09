import { Request, Response, Router } from 'express';
import prisma from '../../prisma/client';

const router = Router();

router.get('/', async (_: Request, response: Response) => {
    const books = await prisma.book.findMany();
    response.send(books);
});

export default router;