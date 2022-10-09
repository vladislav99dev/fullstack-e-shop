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

const findByIdAndPopulate = (id) => {
    return User.findById(id).populate({
        path:'cart',
        populate:{
            path: '_id',
            model:'Product'
        },
    }).populate('favourites orders').lean()
}

const findByIdAndUpdate = (id,data) => {
    return User.findByIdAndUpdate(id,data,{returnDocument:'after'}); 
}
const findByIdAndUpdatePassword = (id,data) => {
    return User.updateOne({_id:id},data,{returnDocument:'after'})
}

const userServices = {
    create,
    findByEmail,
    findById,
    findByIdAndUpdate,
    findByIdAndPopulate,
    findByIdAndUpdatePassword
}

module.exports = userServices;