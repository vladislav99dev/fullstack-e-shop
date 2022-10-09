const productsServices = require("../../services/productsServices");

const deleteProductById = async(id) =>  {
    await productsServices.deleteById(id)
}

module.exports = deleteProductById;