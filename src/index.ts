import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import authorsRouter from './routes/authors';

const app = express();

app.use(cors());
app.use(helmet())
app.use(express.json())

app.use('/api/authors', authorsRouter);

const PORT = 3000;
app.listen(PORT || 3030, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
