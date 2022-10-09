const Token = require('../models/Token');


const create = (data) => {
    return Token.create({...data})
}
const findByUserId = (id) => {
    return Token.find({profileId : id})
}
const deleteById = (id) => {
    return Token.deleteOne({profileId : id})
}


const tokenServices = {
    create,
    findByUserId,
    deleteById
}

module.exports = tokenServices



//user logs in 
    //make token (where)
    //return user without token
    //on each change user trys we search for token in db 
    //if we found we should verify if its still valid
