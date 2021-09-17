import jwt from 'jsonwebtoken';
import { User } from '../entity/user';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

const tokenSecret = process.env.SECRET;
const expiryTime = process.env.EXPTIME;

const generateToken = (user: Partial<User>) => {
    return jwt.sign({data: user.id}, tokenSecret, {expiresIn: expiryTime});
}

const verifyToken = (req: Request, res: Response, next: NextFunction ) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).send()
        return;
    }

    if (token.split(" ")[0] != 'Bearer') {
        res.status(403).send()
        return;
    }

    jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
        if (err) res.status(403).send()
        let id = value.data
        try {
            const _userRepository = getRepository(User);
            const user = _userRepository.findOne(id);
            if (!user) {
                res.status(403).send()
                return;
            }
        }
        catch(error) {
            next({
                message: 'Authentication Failed',
                status: 403
            });
            return;
        }
        req.body.userID = id;
        next();
    })
}


export = {
    generateToken,
    verifyToken
}