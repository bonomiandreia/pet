const express = require('express');
const router = express.Router();
const posts = require('../models/post')
const auth = require('../MD/auth')

router.post( '/', auth, async (require, response) => {
    const { idUser } = require.body

    try {
        const post = await posts.find({ idUser })
        return response.send(post)

    } catch {
        return info.send({error: 'error in info'+error})
    }
})
 
router.post( '/create', auth, async (require, response) => {
    const { date, text, idUser } = require.body;

    if (!date || !text || !idUser) return response.send({message: 'error information'})

    try {
        const postCreate = await posts.create(require.body)
        return response.send(postCreate)

    } catch {
        return response.send( {message: 'error in create a post'})
    }
})

module.exports = router;