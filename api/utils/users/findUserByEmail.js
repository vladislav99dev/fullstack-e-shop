const userServices = require("../../services/userServices");


const findUserByEmail = async(email) => {
    const user = await userServices.findByEmail(email);
    if(!user) throw {status:404, message:'There is no user with this email!'};
    return user;
}


module.exports = findUserByEmail;