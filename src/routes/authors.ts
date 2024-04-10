import { Author } from '@prisma/client';
import { Request, Response, Router } from 'express';
import { z } from 'zod';
import prisma from '../../prisma/client';
import auth from '../middleware/auth';

const schema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, 'Name can not be empty.')
})

const router = Router();

router.get('/', auth, async (_: Request, response: Response) => {
    const authors = await prisma.author.findMany();
    response.send(authors);
});

router.post('/', auth, async (request: Request, response: Response) => {
    const body = request.body as Author;
    const validation = schema.safeParse(body);
    if (!validation.success) return response.status(400).send(validation.error.format());

    const author = await prisma.author.create({ data: { name: body.name } })

    response.status(201).send(author)
});

router.get('/:id', auth, async (request: Request, response: Response) => {
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) return response.status(404).send('Author not found');

    const author = await prisma.author.findUnique({ where: { id } });
    if (!author) return response.status(404).send('Author not found');

    response.send(author);
});

router.put('/:id', auth, async (request: Request, response: Response) => {
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
});

router.delete('/:id', auth, async (request: Request, response: Response) => {
    const id = parseInt(request.params.id, 10);
    if (isNaN(id)) return response.status(404).send('Author not found');

    const author = await prisma.author.findUnique({ where: { id } });
    if (!author) return response.status(404).send('Author not found');

    const deletedAuthor = await prisma.author.delete({ where: { id } });

    response.send(deletedAuthor);
});

router.get('/:authorId/books', auth, async (request: Request, response: Response) => {
    const authorId = parseInt(request.params.authorId, 10);
    if (isNaN(authorId)) return response.status(404).send('Author not found');

    const author = await prisma.author.findUnique({ where: { id: authorId } });
    if (!author) return response.status(404).send('Author not found');

    const books = await prisma.book.findMany({ where: { authorId: author.id } });

    response.send(books);
});

router.get('/:authorId/books/:bookId', auth, async (request: Request, response: Response) => {
    const authorId = parseInt(request.params.authorId, 10);
    if (isNaN(authorId)) return response.status(404).send('Author not found');

    const author = await prisma.author.findUnique({ where: { id: authorId } });
    if (!author) return response.status(404).send('Author not found');

    const bookId = parseInt(request.params.bookId, 10);
    if (isNaN(bookId)) return response.status(404).send('Book not found');

    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) return response.status(404).send('Book not found');

    const books = await prisma.book.findMany({
        where: {
            id: bookId,
            authorId: authorId
        }
    });

    response.send(books);
});

export default router;
