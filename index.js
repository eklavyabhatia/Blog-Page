const express = require('express')
const cookieParser = require('cookie-parser')
const port = 8080
const app = express()
const db = require('./config/mongoose')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')(session)
const sassMiddleWare = require('node-sass-middleware')

app.use(sassMiddleWare({
    src: './assests/scss',
    dest: './assets/css',
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.urlencoded())
app.use(cookieParser())

app.use(express.static('./assets'))
app.use(expressLayouts)
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)



//set up the view engine
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(session({
    name: 'Linkster',
    secret: 'eklavya',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, function (err) {
        if (err) {
            console.log(err)
            return
        }
    })

}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

//use express router
app.use('/', require('./routes'))

app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Server is running on port:', port)
})