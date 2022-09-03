const Product = require('../models/Products/Product')


 const create = (type,category,gender,brand,imageUrl,color,price,sizes) => {
    return Product.create({type,category,gender,brand,imageUrl,color,price,sizes})
}

const productsServices = {
    create,
}
module.exports = productsServices;