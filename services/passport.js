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
    User.findById(id).then((user) =>{
        done(null, user)
    })
})

passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, 
async (accessToken, refreshToken, profile, done) =>{
    //check if profile id exist
    const existingUser = await User.findOne({profileId: profile.id})
    if(existingUser){
        //true
        done(null, existingUser)
    }else{
        const user = await new User({profileId: profile.id}).save()
        done(null, user)
    }
    
}))




passport.use(new facebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true
},
async (accessToken, refreshToken, profile, done) =>{
    //check if profile id exist
    const existingUser = await User.findOne({profileId: profile.id})
     if(existingUser){
            //true
            return done(null, existingUser)
        }
           const user = await new User({profileId: profile.id}).save()
           done(null, user)
        
    
}))