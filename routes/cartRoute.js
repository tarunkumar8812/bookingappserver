const express = require('express')
const router = express.Router()


router.get('/cartDetails', (req, res) => {
    res.json({ msg: "user cart Details" })
})

module.exports = router