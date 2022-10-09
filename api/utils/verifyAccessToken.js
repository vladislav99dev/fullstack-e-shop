const jwt = require('jsonwebtoken');


const verifyAdminToken = (token) => {
    return jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN_SECRET);
 }
 const verifyUserToken = (token) => {
   return jwt.verify(token,process.env.USER_ACCESS_TOKEN_SECRET);
}

const verifyAccessToken = {
    verifyAdminToken,
    verifyUserToken
}
module.exports = verifyAccessToken;