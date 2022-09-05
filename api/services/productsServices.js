const Product = require('../models/Products/Product')


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

const productsServices = {
    create,
    getOne,
    findOneAndUpdate,
    deleteOne
}
module.exports = productsServices;