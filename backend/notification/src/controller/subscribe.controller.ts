import express from 'express';
import { getRepository } from 'typeorm';
import { deviceToken } from '../entity/deviceToken';
import { User } from '../entity/user';

const router = express.Router();

router.post('/subscribe', async (req: express.Request, res: express.Response) => {
    if(!('userId' in req.body) || !('token' in req.body)) {
        res.json({status: 400});
    }
    else {
        try {
            const tokens = getRepository(deviceToken);
            const device = new deviceToken();
            device.token = req.body.token;
            device.user = new User();
            device.user.id = req.body.userId;
            await tokens.save(device);
            res.json({status: 200});
        } catch(error) {
            console.error(error);
            res.json({status: 400});
        }
    }
});

export default router;