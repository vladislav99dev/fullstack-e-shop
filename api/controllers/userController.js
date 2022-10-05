const router = require("express").Router();
const bcrypt = require("bcrypt");

const userServices = require("../services/userServices");
const tokenServices = require("../services/tokenServices");
const userDataValidation = require("../services/validations/userDataValidation");



const userProductsController = require("./userProductsController");


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
        if(err.status) res.status(err.status).json({message:err.message});
        console.log(err);
      }
}

const editHandler = async(req,res) => {
  console.log(`PUT ${req.originalUrl}`);

  const token = req.headers.authorization;
  const {profileId} = req.params;
  const data = req.body;

  if(token === 'undefined' || !token) return res.status(401).json({isAdmin:false, message: 'Access token is not provided!'})

  try{
    tokenServices.verifyUser(token)

    const user = await userServices.findById(profileId);
    if(!user) throw {status:400, message:'There is no user with this id!'};

    userDataValidation.validateEditData(data);
    await userServices.findByIdAndUpdate(profileId,data)
    const populatedUser = await userServices.findByIdAndPopulate(profileId);
    delete populatedUser.password

    return res.status(200).json({message:"You successfully updated your profile!",user:populatedUser})
  }catch(err) {
    if(err.status) return res.status(err.status).json({message:err.message});

    const[error,errorMessage] = Object.values(err);
    if(errorMessage === 'invalid token') return res.status(401).json({isAdmin:false,message:'Access token is invalid!'});
    if(errorMessage === 'jwt malformed') return  res.status(401).json({isAdmin:false,message:'Access token is invalid!'});
    if(errorMessage === 'jwt expired') return  res.status(401).json({isAdmin:false,message:'Access token expired,you should re-login!'});
  }
  res.end();

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
          const accessToken = tokenServices.generateAdmin(populatedUser);
          Object.assign(userData,{...populatedUser,accessToken});
        };
        if(!populatedUser.isAdmin) {
          const accessToken = tokenServices.generateUser(populatedUser);
          Object.assign(userData,{...populatedUser,accessToken});
        }
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
router.put("/:profileId/edit", editHandler);
router.post("/logout", logoutHandler);
router.use("/products", userProductsController);




module.exports = router;

