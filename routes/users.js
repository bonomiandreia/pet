const express = require('express');
const router = express.Router();
const users = require('../models/user')
const crypt = require('bcryptjs')

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

router.post('/auth', (require, response) => {
    const { email, password } = require.body;
    
    if (!email || !password) return response.send({message: 'error information'})
    users.findOne( { email }, (error, data) => {
        if (error) return response.send({ message: 'erro in search user'})
        if (!data) return response.send({ message: 'user doesnt exist'})

        crypt.compare(password, data.password, (error, same) => {
            if (!same) return response.send({ message: 'password doesnt match'})
            return response.send(data)
        })
    }).select('+password')

})

module.exports = router;