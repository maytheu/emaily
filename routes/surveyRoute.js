const mongoose = require('mongoose')
const _ = require('lodash')
const Path = require('path-parser').default
const { URL } = require('url') 
 
const requireLogin = require('../middleware/requireLogin')
const requireCredit = require('../middleware/requireCredit')
const Mailer = require('../services/Mailer')
const surveyTemplate = require ('../services/emailTemplate/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = (app) => {

    app.get('/api/surveys', requireLogin, async (res, req) => {
        const surveys = await Survey.find({ _user: req.user.id})
            .select({recipients: false})
        res.send(surveys)
    })
    
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting')
        console.log(req.body)
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice')//the link we want
        
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname)
                if(match){
                    return { email, surveyId: match.surveyId, choice: match.choice }
                }
            })
            .compact()//filter
            .uniqBy('email', 'surveyId')//compares and delete
            .each(({ email, surveyId, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec() 
            })
        .value()

        res.send({})

        
    })
    
    app.post('/api/surveys', requireLogin, requireCredit, async (req, res) => {
        const { title, subject, body, recipients } = req.body

        const survey = new Survey({
            title,
            subject,
            body,
            //transforming array of string of recipient to array of object
            recipients: recipients.split(',').map( email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })

        //sending email
        const mailer = new Mailer(survey, surveyTemplate(survey))
        try{
            await mailer.send()
            await survey.save()
            req.user.credits -= 1
            const user = await req.user.save()

            res.send(user)
        }catch(err){
            res.status(422).send(err)
        }
    })
}