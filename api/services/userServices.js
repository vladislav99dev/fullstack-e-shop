const User = require('../models/User')

const create = (firstName,lastName,password,email,country,city,street) => {
    return User.create({firstName,lastName,password,email,country,city,street})
}

const findByEmail = (email) => {
    return User.findOne({email:email}).lean()
} 

const findById = (id) => {
    return User.findById(id)
}

const findByIdPopulated = (id) => {
    return User.findById(id).populate({
        path:'cart',
        populate:{
            path: '_id',
            model:'Product'
        },
        // path:'favourites'
    }).populate('favourites').lean()
}

const findByIdAndUpdate = (data,id) => {
    return User.findByIdAndUpdate(id,data)
}

const userServices = {
    create,
    findByEmail,
    findById,
    findByIdAndUpdate,
    findByIdPopulated
}

module.exports = userServices;