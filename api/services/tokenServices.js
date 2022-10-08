const Token = require('../models/Token');


const create = (data) => {
    return Token.create({...data})
}


const tokensServices = {
    create
}

module.exports = tokensServices



//user logs in 
    //make token (where)
    //return user without token
    //on each change user trys we search for token in db 
    //if we found we should verify if its still valid
