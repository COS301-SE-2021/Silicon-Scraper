import jwt from 'jsonwebtoken';

const tokenSecret = "my-token-secret";

const generateToken = (user) => {
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'});
}

const verifyToken = (req, res, next) => {
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
        req.body.userID = value.data.id;
        next();
    })
}

export = {
    generateToken,
    verifyToken
}