const userServices = require("../../services/userServices")


const findUserByIdAndUpdatePassword = async(user) => {
    const updatedUser = await userServices.findByIdAndUpdatePassword(user._id,user);
    if(!updatedUser) throw {status:400, message:'There is no user with this id!'};
    return updatedUser;
}


module.exports = findUserByIdAndUpdatePassword;