import express from 'express';
import service from '../service/recommendationService';

const router = express.Router();

router.get('/recommendation/:id', (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const recommendations = service.getRecommendations(id);
    res.status(200).json({ products: recommendations });
});

export default router;