const tokenServices = require('../services/tokenServices')


const isAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        const admin = tokenServices.verify(token);
        req.isAdmin = {isAdmin:true, message:'Token is valid.', admin};
    } catch(err){
        const[error,errorMessage] = Object.values(err)
        if(errorMessage === 'invalid token') return res.status(401).json({isAdmin:false,message:'Token is invalid!'});
        if(errorMessage === 'jwt expired') return  res.status(401).json({isAdmin:false,message:'Token expired!'});
    }
    next();
}

module.exports = isAdmin