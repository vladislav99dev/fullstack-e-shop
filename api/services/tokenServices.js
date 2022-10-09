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
