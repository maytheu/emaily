const keys = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')

const stripe = require('stripe')(keys.stripeSecretKey)

module.exports = (app) => {
    //returned data from stripe api
    app.post('/api/stripe', requireLogin, async (req, res) => {
        
        const charge = await  stripe.charges.create({
            amount:5000,
            currency:'usd',
            description:'$5 for 5 credits',
            source: req.body.id
        })
        //since the user is logged in, use passport authentication to add credit
        req.user.credits += 5
        const user = await req.user.save()

        res.send(user)
    })
}   