const express = require('express');
const router = express.Router();

router.get( '/', (require, response) => {
    return response.send({message:'tudo ok com posts'})
})

router.post( '/', (require, response) => {
    return response.send({message:'tudo ok com posts'})
})

module.exports = router;