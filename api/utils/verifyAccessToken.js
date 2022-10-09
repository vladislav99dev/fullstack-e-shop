const jwt = require('jsonwebtoken');


const admin = (token) => {
    return jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN_SECRET);
 }
 const user = (token) => {
   return jwt.verify(token,process.env.USER_ACCESS_TOKEN_SECRET);
}

const verifyAccessToken = {
    admin,
    user
}
module.exports = verifyAccessToken;