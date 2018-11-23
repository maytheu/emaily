const passport = require('passport')

module.exports = (app) => {
    //redirect to goole for authentication
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

    //handles data after authentication
    app.get('/auth/google/callback', passport.authenticate('google'))


    //facebook route
    app.get('/auth/facebook', passport.authenticate('facebook'))

    app.get('/auth/facebook/callback',
    passport.authenticate('facebook'))

    app.get('/api/logout', (req, res) =>{
        req.logout()
        res.send(req.user)
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })
}