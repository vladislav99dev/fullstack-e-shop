const productsServices = require("../../services/productsServices");

const findProductByIdAndUpdate = async(id,data) =>  {
    const product = await productsServices.findByIdAndUpdate(id,data)
    return product;
}

module.exports = findProductByIdAndUpdate;
