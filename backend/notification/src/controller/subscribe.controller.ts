import express from 'express';
import { userInfo } from 'os';
import { getRepository } from 'typeorm';
import { deviceToken } from '../entity/deviceToken';
import { User } from '../entity/user';

const router = express.Router();

/**
 * 
 * @param req Express Request object. Body includes device token and user ID
 * @param res Sends response confirming successful subscription
 */
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
        console.log(error);
    } finally {
        res.json({status: 200});
    }
});

export default router;