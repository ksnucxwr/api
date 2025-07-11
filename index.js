const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const helloRoute = require('./routes/auth')
app.use('/auth', helloRoute)

app.listen(port, () => {
    console.log(`🚀 Welcome to API`)
})
