const Order = require("../../models/Order");


const create = async(data) => {
    const order = await  Order.create({...data})
    return order;
}

const orderServices = {
    create
}

module.exports = orderServices;