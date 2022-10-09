const productsServices = require("../../services/productsServices");


const findByGender = async(gender) => {
    const products = await productsServices.findByGender(gender);
    return products;
}
module.exports = findByGender