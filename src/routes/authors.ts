import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_: Request, response: Response) => {
    response.send('Authors data');
});

export default router;
