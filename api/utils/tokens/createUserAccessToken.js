const tokenServices = require("../../services/tokenServices");
const generateAccessToken = require("./generateAccessToken")

const createUserAccessToken = async(user) => {
    let generatedToken = '';

    if(user.isAdmin) generatedToken = generateAccessToken.admin(user);
    if(!user.isAdmin) generatedToken = generateAccessToken.user(user);

    const createdToken = await tokenServices.create({profileId:user._id,token:generatedToken});
}


module.exports = createUserAccessToken;