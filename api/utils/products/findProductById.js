const productServices = require("../../services/productsServices");

const findProductById = async(id) => {
    const product = await productServices.findById(id);
    if(!product) throw {status:404,message:"Product with this id was not found!"}
    return product
}
module.exports = findProductById;