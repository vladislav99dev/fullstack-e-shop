const productsServices = require("../../services/productsServices");

const createProduct = async(data) =>  {
    const product = await productsServices.create(data)
    return product;
}

module.exports = createProduct;