const express = require('express')

const router = express.Router();

// /teacher routes
router.get('/', (req, res) => {

    res.json('hello teacher');

})

module.exports = router;
