const jwt = require('jsonwebtoken');

 const verify = (token) => {
    return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
 }
 
 const generate = (user) => {
   return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1d'});
 }

 const tokenServices = {
    verify,
    generate
 }

 module.exports = tokenServices;