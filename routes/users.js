const express = require('express');
const router = express.Router();
const users = require('../models/user')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createdToken = (idUser) => {
    return jwt.sign({ id: idUser }, 'teste123', {expiresIn: '7d'})
}

router.get( '/', async (require, response) => {

    try {
        const user = await users.find({});
        return response.send(user);

    } catch (error) {
        return response.send({error: 'error in info'+error})
    }
})

router.post( '/create', async (require, response) => { 

    const { email, password } = require.body;

    if (!email || !password) return response.send({message: 'error information'})
    
    try {

        if (await users.findOne( { email })) return response.send({ error: 'user already exist'})

        const create = await users.create(require.body);
        create.password = undefined;
        return response.send({create, token: createdToken(create.id)})

    } catch (error) {
        return response.send({ error: 'erro in search user'})
    }

})

router.post('/auth', async (require, response) => {
    const { email, password } = require.body;
    if (!email || !password) return response.send({error: 'error information'})

    try {
        const auth = await users.findOne( {email}).select('+password');
        if (!auth) return response.send({ error: 'user doesnt exists'})

        const passwordOk = await crypt.compare(password, auth.password);
        if (!passwordOk) return response.send({ error: 'password doesnt match'}) 

        auth.password = undefined;
        return response.send({auth, token: createdToken(auth.id)})

    } catch (error) {
        return response.send({ error: 'erro in search user'})
    }
})


module.exports = router;