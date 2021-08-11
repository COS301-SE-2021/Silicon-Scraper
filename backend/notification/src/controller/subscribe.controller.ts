import express from 'express';
import { getRepository } from 'typeorm';
import { deviceToken } from '../entity/deviceToken';
import { User } from '../entity/user';

const router = express.Router();

router.post('/subscribe', async (req: express.Request, res: express.Response) => {
    if(!('userID' in req.body) || !('token' in req.body)) {
        res.json({status: 400});
    }
    try {
        const tokens = getRepository(deviceToken);
        const device = new deviceToken();
        device.token = req.body.token;
        device.user = new User();
        device.user.id = req.body.userID;
        await tokens.save(device);
    } catch(error) {
        console.error(error);
        res.json({status: 400});
    } finally {
        res.json({status: 200});
    }
});

export default router;