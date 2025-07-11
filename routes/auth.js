const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const name = req.query.code
    res.json({ message: `Hello, ${name || 'guest'}` })
})

module.exports = router
