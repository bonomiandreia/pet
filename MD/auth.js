const jwt = require('jsonwebtoken')

const auth = (res, req, next) => {

    const token = req.req.headers.token;

    if (!token) return res.send({ error: 'access isnt allow'})
    jwt.verify(token, 'teste123', (error, decoded) => {
        if (error) return res.send({ error: 'token invalido'})
        return next();
    })
}

module.exports = auth;