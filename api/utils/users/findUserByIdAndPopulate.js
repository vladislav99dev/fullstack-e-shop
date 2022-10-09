const userServices = require("../../services/userServices");



const findUserByIdAndPopulate = async(id) => {
    const {password, ...populatedUser} = await userServices.findByIdAndPopulate(id);
    if(!populatedUser) throw {status:400, message:'There is no user with this id!'};
    return populatedUser;
}


module.exports = findUserByIdAndPopulate;