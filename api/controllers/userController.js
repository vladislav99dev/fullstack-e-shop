const router = require("express").Router();
const bcrypt = require("bcrypt");

const userServices = require("../services/userServices");
const tokenServices = require("../services/tokenServices");

const userProductsController = require("./userProductsController");
const userDataValidation = require("../services/validations/userDataValidation");


const registerHandler = async(req,res)=> {
      console.log(`POST ${req.originalUrl}`);
      const data = req.body;

      try {
          userDataValidation.validateRegisterData(data);

          const user = await userServices.findByEmail(data.email);
          if(user) throw {status:409, message:'User with this email already exist!'};

          await userServices.create(data);
          return res.status(201).json({message:"You successfully created new user profile!"});
      } catch(err){
        if(err.status) res.status(status).json({message:err.message});
        console.log(err);
      }
}


const loginHandler = async(req,res) => {
      console.log(`POST ${req.originalUrl}`);
      const data = req.body;
      const userData = {};

      try {
        userDataValidation.validateLoginData(data);

        const user = await userServices.findByEmail(data.email);
        if(!user) throw {status:404, message:'Incorrect email or password!'};

        const isValid = await bcrypt.compare(data.password,user.password);
        if(!isValid) throw {status:401, message:'Incorrect email or password'};

        const {password, ...populatedUser} = await userServices.findByIdAndPopulate(user._id);

        if(populatedUser.isAdmin){
          const accessToken = tokenServices.generate(populatedUser);
          Object.assign(userData,{...populatedUser,accessToken});
        };
        if(!populatedUser.isAdmin) Object.assign(userData,populatedUser);

        return res.status(200).json({user:userData,message:'You have successfully logged in!'});
      } catch(err){
        if(err.status) return  res.status(err.status).json({message:err.message});
        console.log(err);
      }
}

const logoutAdminHandler = (req,res) => {
  console.log(`POST ${req.originalUrl}`);
  const token = req.headers.authorization;
  if(!token) return res.status(401).json({error:'No access token provided!'});
   
  try {
    const decodedToken = tokenServices.verify(token);
    res.status(200).json({successMessage: 'You have successfully loged out!'});
  } catch(err) {
    return res.status(401).json({error:'Your accessToken have expired!'});
  }
}
//only here left for refactoring in thsi controller

const logoutHandler = (req,res) => {
  console.log(`POST ${req.originalUrl}`);
  res.status(200).json({successMessage: 'You have successfully loged out!'});
}




router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.use("/products", userProductsController);




module.exports = router;

