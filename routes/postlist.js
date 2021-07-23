const express = require('express');
const router = express.Router();
const posts = require('../models/post')
const auth = require('../MD/auth')

router.get( '/:id', auth, async (require, response) => {
    const idUser = require.params.id;
    try {
        const post = await posts.find({idUser})
        return response.send(post)

    } catch {
        return response.status(400).send( {message: 'error search a post'})
    }
})
 
router.post( '/create', auth, async (require, response) => {
    const { date, text, idUser } = require.body;

    if (!date || !text || !idUser) return response.send({message: 'error information'})

    try {
        await posts.create(require.body)
        const post = await posts.find({idUser})
        return response.send(post);

    } catch {
        return response.status(400).send( {message: 'error in create a post'})
    }
})

router.delete( '/delete/:id', auth, async (require, response) => {

    const idPost = require.params.id;

    posts.findByIdAndRemove(idPost).then(() => {
        response.status(200).send( {message: 'success your post was deleted!'})
      }).catch(() => {
        response.status(400);
    });
})


module.exports = router;