const express = require('express');
const router = express.Router();
const users = require('../models/user')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../MD/auth')

const createdToken = (idUser) => {
    return jwt.sign({ id: idUser }, 'teste123', {expiresIn: '7d'})
}

router.get( '/', auth,async (require, response) => {

    try {
        const user = await users.find({});
        return response.send(user);

    } catch (error) {
        return response.status(400).send({error: 'error in info'+error})
    }
})

router.post( '/create', async (require, response) => { 

    const { email, password  } = require.body;

    if (!email || !password) return response.send({message: 'error information'})
    
    try {

        if (await users.findOne( { email })) return response.send({ error: 'user already exist'})

        const create = await users.create(require.body);
        create.password = undefined;
        return response.send({create, token: createdToken(create.id)})

    } catch (error) {
        return response.status(400).send({ error: 'erro in search user'})
    }

})

router.post('/auth', async (require, response) => {
    const { email, password } = require.body;
    if (!email || !password) return response.send('Error information')

    try {
        const auth = await users.findOne( {email}).select('+password');
        if (!auth) return response.status(422).send('User doesnt exists')

        const passwordOk = await crypt.compare(password, auth.password);
        if (!passwordOk) return response.status(422).send('Password or email are incorrect. ):') 

        auth.password = undefined;
        return response.send({auth, token: createdToken(auth.id)})

    } catch (error) {
        return response.status(400).send({ error: 'Error in search user'})
    }
})


module.exports = router;