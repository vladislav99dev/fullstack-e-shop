const userServices = require("../../services/userServices");



const findUserById = async(id) => {
    const user = await userServices.findById(id);
    if(!user) throw {status:400, message:'There is no user with this id!'};
    return user;
}


module.exports = findUserById;