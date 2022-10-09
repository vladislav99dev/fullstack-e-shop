const tokenServices = require("../../services/tokenServices");

const findUserAccessToken = async(userId) => {
    const [{token}] = await tokenServices.findByUserId(userId);
    if(!token) throw {status:404,message:"There is no token generated for this user!"};
    return token
}

module.exports = findUserAccessToken;