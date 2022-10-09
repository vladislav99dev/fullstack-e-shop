const userServices = require("../../services/userServices");


const createUser = async(data) => {
    const user = await userServices.create(data);
    if(!user) throw {status:400, message:'User creation failed!'};
    return user;
}

module.exports = createUser;