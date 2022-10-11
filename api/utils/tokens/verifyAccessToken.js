const jwt = require("jsonwebtoken");

const verifyAccessToken = async(user,token) => {
  let isExpired ;
  try{
    if(user.isAdmin)  jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    if(!user.isAdmin)  jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET);
  } catch(err) {
    const [error,errorMessage] = Object.values(err);

    if(errorMessage === 'invalid token' || errorMessage ==='jwt malformed') throw {status:401,message:'Access token is invalid!'}

    if(errorMessage === 'jwt expired') {
      isExpired = true;
      return isExpired
    }
  }
  isExpired = false
  return isExpired
};


module.exports = verifyAccessToken;
