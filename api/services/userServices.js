const User = require('../models/User')

const create = (firstName,lastName,email,country,city,street) => {
    return User.create({firstName,lastName,email,country,city,street})
}

const findOne = (email) => {
    return User.findOne({email:email}).lean()
} 


const userService = {
    create,
    findOne
}

module.exports = userService;