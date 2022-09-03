const tokenServices = require('../services/tokenServices')


const isAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if(token === 'undefined') return res.status(401).json({isAdmin:false, message: 'Token is not provided!'})
    try{
        const admin = tokenServices.verify(token);
    } catch(err){
        const[error,errorMessage] = Object.values(err)
        if(errorMessage === 'invalid token') return res.status(401).json({isAdmin:false,message:'Token is invalid!'});
        if(errorMessage === 'jwt expired') return  res.status(401).json({isAdmin:false,message:'Token expired!'});
    }
    next()
}

module.exports = isAdmin