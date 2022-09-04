const Product = require('../models/Products/Product')


 const create = (type,category,gender,brand,imageUrl,color,price,sizes) => {
    return Product.create({type,category,gender,brand,imageUrl,color,price,sizes})
}
const getOne = (id) => {
    return Product.findById(id)
} 
const findOneAndUpdate = (data,id) => {
    return Product.findByIdAndUpdate(id,data)
}

const productsServices = {
    create,
    getOne,
    findOneAndUpdate
}
module.exports = productsServices;