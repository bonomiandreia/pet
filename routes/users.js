const express = require('express');
const router = express.Router();
const users = require('../models/user')

router.get( '/', (require, response) => {
    users.find({}, (error, info) => {
        if (error) return info.send({error: 'error in info'+error})
        return response.send(info)
    })
})

router.post( '/create', (require, response) => {
    const { email, password } = require.body;

    if (!email || !password) return response.send({message: 'error information'})

    users.findOne({ email }, (error, adress) => {
        if (error) return response.send({ message: 'erro in search user'})
        if (adress) return response.send({ menssage: 'user already exist'})

        users.create(require.body, (error, created) => {
            if (error) return response.send({ message: 'error in create user'})
            return response.send(created)
        })

    })
})

module.exports = router;