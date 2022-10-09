const tokenServices = require("../../services/tokenServices");

const deleteUserAccessToken = async(userId) => {
    await tokenServices.deleteById(userId)
}

module.exports = deleteUserAccessToken