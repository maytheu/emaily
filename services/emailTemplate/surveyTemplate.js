const keys = require('../../config/keys')

//will contain the body of the mail ie with somw html content
module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>I'd like your input</h3>
                    <p>Please answer the following question</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${keys.redirectDomian}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${keys.redirectDomian}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `
}