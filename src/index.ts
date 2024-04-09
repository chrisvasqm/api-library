import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(helmet())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express!');
});

const PORT = 3000;
app.listen(PORT || 3030, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
