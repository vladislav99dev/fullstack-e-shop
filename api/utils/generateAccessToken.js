const jwt = require('jsonwebtoken');


const generateAdminToken = (user) => {
    return jwt.sign(user,process.env.ADMIN_ACCESS_TOKEN_SECRET,{expiresIn: '1d'});
  }
  const generateUserToken = (user) => {
    return jwt.sign(user,process.env.USER_ACCESS_TOKEN_SECRET,{expiresIn: '1d'});
  }

  const generateAccessToken = {
    generateUserToken,
    generateAdminToken
  }

  module.exports = generateAccessToken ;