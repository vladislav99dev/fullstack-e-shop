const productsServices = require("../../services/productsServices");

const findAllProducts = async() => {
    const products = await productsServices.findAll();
    return products
}
module.exports = findAllProducts