const Order = require("../../models/Order");


const create = async(data) => {
    const order = await  Order.create({...data})
    return order;
}

const findByUserId = async(id) => {
    let orders = await Order.find({profileId:id}).populate({
        path:'productsOrdered',
        populate:{
            path:'_id',
            model:'Product'
        }
    })
    return orders
}

const orderServices = {
    create,
    findByUserId
}

module.exports = orderServices;