import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import homeRouter from './routes/home';
import authorsRouter from './routes/authors';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', homeRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`Library API is running on http://localhost:${PORT}`);
});

export default app;