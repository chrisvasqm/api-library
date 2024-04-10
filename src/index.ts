import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import homeRouter from './routes/home';
import authorsRouter from './routes/authors';
import booksRouter from './routes/books';
import usersRouter from './routes/users';

const app = express();

app.use(cors());
app.use(helmet())
app.use(express.json());

app.use('/', homeRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);

const PORT = 3000;
app.listen(PORT || 3030, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
