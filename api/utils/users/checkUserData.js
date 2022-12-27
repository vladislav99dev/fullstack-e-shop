const checkUserData = (user) = () => {
    const card = checkField(user.cart);
    const favourites = checkField(user.favourites);
    const orders = checkField(user.orders);
    user.cart = card;
    user.favourites = favourites;
    user.orders = orders;
    return user;
}


function checkField(arr){
    const filtered =  arr.filter.filter((item) => item._id !== null);
    return filtered
}

module.exports = checkField;