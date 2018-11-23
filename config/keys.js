if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
}

//CLIENTID 557941099846-kuutc5igoq5qclmgbegpqgqc5t3s5cem.apps.googleusercontent.com
//CLIENTKEY Pt8weQDl64vN-NAY8C77KCEf
