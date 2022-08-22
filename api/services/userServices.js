const User = require('../models/User')

const create = (firstName,lastName,password,email,country,city,street) => {
    return User.create({firstName,lastName,password,email,country,city,street})
}

const findOne = (email) => {
    return User.findOne({email:email}).lean()
} 


const userService = {
    create,
    findOne
}

module.exports = userService;