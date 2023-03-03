const express = require('express')
const router = express.Router()


router.get('/profile', (req, res) => {
    res.json({ msg: "user profile" })
})

module.exports = router