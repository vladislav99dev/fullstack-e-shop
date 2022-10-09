const jwt = require("jsonwebtoken");
const deleteUserAccessToken = require("./deleteUserAccessToken");

const verifyAccessToken = async(user,token) => {
  try{
    if(user.isAdmin)  jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    if(!user.isAdmin)  jwt.verify(token, process.env.USER_ACCESS_TOKEN_SECRET);
  } catch(err) {
    const [error,errorMessage] = Object.values(err);

    if(errorMessage === 'invalid token' || errorMessage ==='jwt malformed') throw {status:401,message:'Access token is invalid!'}

    if(errorMessage === 'jwt expired') {
      await deleteUserAccessToken(user._id);
      throw  {status:401,message:'Access token expired,you should re-login!'}
    }
  }
};


module.exports = verifyAccessToken;
