const express = require('express');
const router = express.Router();

router.get( '/', (req, res) => {
    return res.send({message:'tudo ok com index'})
})

module.exports = router;