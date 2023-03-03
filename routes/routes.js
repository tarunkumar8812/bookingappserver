const express = require('express')
const router = express.Router()


router.get('/bye', (req, res) => {
    res.json({ msg: "bye world" })
})

module.exports = router