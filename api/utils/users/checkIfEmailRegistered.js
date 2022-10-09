const userServices = require("../../services/userServices");

const checkIfEmailRegistered = async(email) => {
    const user = await userServices.findByEmail(email);
    if(user) throw {status:409,message:"There is already a user with this email!"}
}


module.exports = checkIfEmailRegistered;