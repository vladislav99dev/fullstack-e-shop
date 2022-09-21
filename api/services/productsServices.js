const Product = require('../models/Product')


 const create = (data) => {
    return Product.create({...data})
}
const findById = (id) => {
    return Product.findById(id)
} 
const findByIdAndUpdate = (data,id) => {
    return Product.findByIdAndUpdate(id,data)
}

const deleteById = (id) => {
    return Product.findByIdAndDelete(id)
}
const findAll = () => {
    return Product.find();
}

const findByGender = (gender) => {
    return Product.find({gender:gender}).exec()
}

const productsServices = {
    create,
    findById,
    findByIdAndUpdate,
    deleteById,
    findByGender,
    findAll
}
module.exports = productsServices;