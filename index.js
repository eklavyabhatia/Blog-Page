const express = require('express')
const port = 8080

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/', require('./routes'))

app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Server is running on port:', port)
})