const User = require('../models/User')

const create = (data) => {
    return User.create({...data})
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

const findByIdAndUpdate = (data,id) => {
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