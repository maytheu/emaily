const express = require ('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')

const keys = require('./config/keys')
require('./models/user')
require('./services/passport')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())//handle  post request for express

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authroute')(app)
require('./routes/biilingRoute')(app)

//express behaviour in prod env
if(process.env.NODE_ENV === 'production'){
    //serve up production assets
    app.use(express.static('client/build'))

    //load up index.html if it does not recognise the route
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'inidex.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)