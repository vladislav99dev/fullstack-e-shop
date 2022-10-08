const jwt = require('jsonwebtoken');

 const verifyAdmin = (token) => {
    return jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN_SECRET);
 }
 const verifyUser = (token) => {
   return jwt.verify(token,process.env.USER_ACCESS_TOKEN_SECRET);
}
 
 const generateAdmin = (user) => {
   return jwt.sign(user,process.env.ADMIN_ACCESS_TOKEN_SECRET,{expiresIn: '1d'});
 }
 const generateUser = (user) => {
   return jwt.sign(user,process.env.USER_ACCESS_TOKEN_SECRET,{expiresIn: '1d'});
 }

 const tokenGenerationAndVerification = {
   verifyAdmin,
   verifyUser,
   generateAdmin,
   generateUser
 }

 module.exports = tokenGenerationAndVerification;