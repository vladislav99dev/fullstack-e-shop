const Order = require("../models/Order");


const create = (data) => {
    return Order.create({...data})
}

const orderSerices = {
    create
}
module.exports = orderSerices;