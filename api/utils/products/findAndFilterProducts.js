const productsServices = require("../../services/productsServices");

const findAndFilterProducts = async(filterData) => {
    const products = await productsServices.findByFilter(filterData);
    return products
}
module.exports = findAndFilterProducts;