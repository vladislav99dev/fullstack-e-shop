const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userServices = require("../services/userServices");

const registerHandler = async(req,res)=> {
  console.log(`POST ${req.originalUrl}`);
  const { firstName, lastName, password, email, country, city, street } = req.body;
  
  if(!firstName || !lastName || !password || !email || !country || !city || !street) 
  return res.status(400)
  .json({error:'FisrtName, LastName, Password, Email, Country, City and Street need to be provided in order to continue!'});
      try {
          const user = await userServices.findOne(email);
          const isUserFound = Boolean(user);
          if(isUserFound) return res.status(409).json({error:'User with this email already exist!'});
          
          const dbResponse = await userServices.create(
              firstName,
              lastName,
              password,
              email,
              country,
              city,
              street
          );
          return res.status(201).json(dbResponse);
      } catch(err){
          let error = err._message;
          let errors = Object.values(err.errors);
          let specifficError = errors[0].properties.message;
          res.status(400).json({ error, specifficError });
      }
}


const loginHandler = async(req,res) => {
  console.log(`POST ${req.originalUrl}`);
  const {email,password} = req.body;
  if(!email || !password) return res.status(400).json({error:'Email and Password are required in order to continue'});
    try {
        const user = await userServices.findOne(email);

        const isUserFound = Boolean(user);
        if(!isUserFound) return res.status(404).json({error:'Incorrect email or password'});
        
        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid) return res.status(404).json({error:'Incorrect email or password'});
        
        delete user.password
        const accessToken = generateAccessToken(user);
        return res.status(200).json({user,accessToken});
    } catch(err){
        console.log(err);
    }
}

const logoutHandler = async(req,res) => {
  console.log(`POST ${req.originalUrl}`);

  const token = req.headers.authorization;
  if(!token) return res.status(401).json({error:'No access token provided!'});
   
  try {
    const decodedToken = verifyAccessToken(token);
    res.status(200).json({successMessage: 'You have successfully loged out!'});
  } catch(err) {
    return res.status(401).json({error:'Your accessToken have expired!'});
  }
}


const verifyAccessToken = (token) => {
   return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
}

const generateAccessToken = (user) => {
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '30s'});
}

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);



module.exports = router;

