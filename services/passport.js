const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const facebookStrategy = require('passport-facebook').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

//import user from model/user
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findOne({_id: id}).then((user) =>{
        done(null, user)
    }).catch(err => {
        done(null, err)
    })
})

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) =>{
    //check if profile id exist
    User.findOne({profileId: profile.id}).then((existingUser) =>{
        if(existingUser){
            //true
            done(null, existingUser)
        }else{
            new User({profileId: profile.id}).save().then(user => done(null, user))
        }
    })
}))




passport.use(new facebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true
},(accessToken, refreshToken, profile, done) =>{
    //check if profile id exist
    User.findOne({id: profile.id}).then((existingUser) =>{
        if(existingUser){
            //true
            done(null, existingUser)
        }else{
            new User({id: profile.id}).save().then(user => done(null, user))
        }
    })
}))