const formatUserBeforeUpdate = (user,orderId) => {
    user.cart = [];
    user.orders.push(orderId)
    return user;
}
module.exports = formatUserBeforeUpdate