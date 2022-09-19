const Product = require('../models/Product')


 const create = (data) => {
    return Product.create({...data})
}
const getOne = (id) => {
    return Product.findById(id)
} 
const findOneAndUpdate = (data,id) => {
    return Product.findByIdAndUpdate(id,data)
}

const deleteOne = (id) => {
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
    getOne,
    findOneAndUpdate,
    deleteOne,
    findByGender,
    findAll
}
module.exports = productsServices;