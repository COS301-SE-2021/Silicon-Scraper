import express from 'express';

const router = express.Router();

router.get('/recommendation/:id', (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: 'Hello there' });
})

export default router;