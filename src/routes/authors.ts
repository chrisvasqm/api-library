import { Router, Request, Response } from 'express';
import prisma from '../../prisma/client';
import { z } from 'zod';
import { Author } from '@prisma/client';

const schema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, 'Name can not be empty.')
})

const router = Router();

router.get('/', async (_: Request, response: Response) => {
    const authors = await prisma.author.findMany();
    response.send(authors);
});

router.post('/', async (request: Request, response: Response) => {
    const body = request.body as Author;
    const validation = schema.safeParse(body);
    if (!validation.success) response.status(400).send(validation.error.format());

    const author = await prisma.author.create({
        data: {
            name: body.name
        }
    })

    response.status(201).send(author)
});

router.put('/:id', async (request: Request, response: Response) => {
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) return response.status(404).send('Author not found');

    const body = request.body as Author;
    const validation = schema.safeParse(body);
    if (!validation.success) return response.status(400).send(validation.error.format());

    const author = await prisma.author.findUnique({ where: { id } });
    if (!author) return response.status(404).send('Author not found');

    const updatedAuthor = await prisma.author.update({
        where: { id },
        data: { name: body.name }
    });

    response.send(updatedAuthor);
})

export default router;
