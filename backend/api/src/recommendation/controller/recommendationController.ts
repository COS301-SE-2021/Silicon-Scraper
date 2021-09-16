import express from 'express';
import service from '../service/recommendationService';

const router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const recommendations = await service.getRecommendations(id);
    res.status(200).json({ products: recommendations });
});

export default router;