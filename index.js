const express = require('express')
const port = 8080
const expressLayouts = require('express-ejs-layouts')
const app = express()

app.use(express.static('./assets'))

app.use(expressLayouts)
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


//use express router
app.use('/', require('./routes'))

//set up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Server is running on port:', port)
})