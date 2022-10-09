const userServices = require("../../services/userServices");



const findUserByIdAndUpdate = async(id,data) => {
    const updatedUser = await userServices.findByIdAndUpdate(id,data);
    if(!updatedUser) throw {status:400, message:'There is no user with this id!'};
    return updatedUser;
}


module.exports = findUserByIdAndUpdate;