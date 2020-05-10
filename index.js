const express = require('express')
const cookieParser = require('cookie-parser')
const port = 8080
const app = express()

const db = require('./config/mongoose')

const expressLayouts = require('express-ejs-layouts')

app.use(express.urlencoded())
app.use(cookieParser())

app.use(expressLayouts)
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.use(express.static('./assets'))


//set up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

//use express router
app.use('/', require('./routes'))


app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Server is running on port:', port)
})