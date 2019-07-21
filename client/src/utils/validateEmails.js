const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default (emails) => {
    const invalidEmails = emails.split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false)
    
    //replace(/,\s*$/, "").split(/\s*,\s*/);

    if(invalidEmails.length){
        return `These email are invalid: ${invalidEmails}`
    }
    return
}