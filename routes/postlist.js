const express = require('express');
const router = express.Router();
const posts = require('../models/post')

router.post( '/', (require, response) => {
    const { idUser } = require.body
    posts.find({ idUser }, (error, info) => {
        if (error) return info.send({error: 'error in info'+error})
        return response.send(info)
    })
})
 
router.post( '/create', (require, response) => {
    const { date, text, idUser } = require.body;

    if (!date || !text || !idUser) return response.send({message: 'error information'})

    posts.create(require.body, (error, created) => {
        if (error) return response.send( {message: 'error in create a post'})
        return response.send(created)
    }) 
})

module.exports = router;