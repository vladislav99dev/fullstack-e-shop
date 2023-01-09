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

const findById = async(id) => {
    let order = await Order.findById(id);
    if(!order) throw {status:404,message:'Product with this id was not found!'};
    return order
}

const getAll = async(id) => {
    let orders = await Order.find();
    return orders
}

const orderServices = {
    create,
    findByUserId,
    findById,
    getAll
}

module.exports = orderServices;