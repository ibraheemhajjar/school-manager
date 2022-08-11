const express = require('express')

const router = express.Router();
// /parent routes
router.get('/', (req, res) => {

    res.json('hello parent');

})

module.exports = router;
