const User = require('../models/User')

const create = (firstName,lastName,password,email,country,city,street,state,zipCode,unitNumber,phoneNumber) => {
    return User.create({firstName,
        lastName,
        password,
        email,
        country,
        city,
        street,
        state,
        zipCode,
        unitNumber,
        phoneNumber})
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
    }).populate('favourites').lean()
}

const findByIdAndUpdate = async (data,id) => {
    return User.findByIdAndUpdate(id,data,{returnDocument:'after'});
    
}

const userServices = {
    create,
    findByEmail,
    findById,
    findByIdAndUpdate,
    findByIdPopulated
}

module.exports = userServices;