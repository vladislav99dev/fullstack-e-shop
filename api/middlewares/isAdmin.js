const tokenServices = require('../services/tokenGenerationAndVerification')


const isAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if(token === 'undefined' || !token) return res.status(401).json({isAdmin:false, message: 'Access token is not provided!'})
    try{
        const admin = tokenServices.verifyAdmin(token);
    } catch(err){
        const[error,errorMessage] = Object.values(err)
        if(errorMessage === 'invalid token') return res.status(401).json({isAdmin:false,message:'Access token is invalid!'});
        if(errorMessage === 'jwt malformed') return  res.status(401).json({isAdmin:false,message:'Access token is invalid!'});
        if(errorMessage === 'jwt expired') return  res.status(401).json({isAdmin:false,message:'Access token expired,you should re-login!'});
    }
    next()
}

module.exports = isAdmin