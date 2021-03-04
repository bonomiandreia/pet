const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.auth;
    if(!token) return res.send({ error: 'empty token' });

    jwt.verify(token, 'teste123', (err, decoded) => {
        if (err) return res.send({ error: 'invalid token' });
        return next();
    });
}

module.exports = auth;
