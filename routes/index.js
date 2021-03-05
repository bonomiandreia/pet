const express = require('express');
const router = express.Router();
const auth = require('../MD/auth')

router.get( '/', auth, async (req, res) => {
    return res.send({message:'ok'})
})

module.exports = router;