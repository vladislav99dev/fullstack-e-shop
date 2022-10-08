const router = require("express").Router();
const bcrypt = require("bcrypt");

const userServices = require("../services/userServices");
const tokenGenerationAndVerification = require("../services/tokenGenerationAndVerification");
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
    tokenGenerationAndVerification.verifyUser(token)

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
      let accessToken = '';

      try {
        userDataValidation.validateLoginData(data);

        const user = await userServices.findByEmail(data.email);
        if(!user) throw {status:404, message:'Incorrect email or password!'};

        const isValid = await bcrypt.compare(data.password,user.password);
        if(!isValid) throw {status:401, message:'Incorrect email or password'};


        if(user.isAdmin) 
          accessToken = tokenGenerationAndVerification.generateAdmin(user);

        if(!user.isAdmin) 
          accessToken = tokenGenerationAndVerification.generateUser(user);
  
        await tokenServices.create({profileId:user._id,token:accessToken});

        const {password, ...populatedUser} = await userServices.findByIdAndPopulate(user._id);

        Object.assign(userData,{...populatedUser});
        return res.status(200).json({user:userData,message:'You have successfully logged in!'});
      } catch(err){
        if(err.status) return  res.status(err.status).json({message:err.message});
        console.log(err);
      }
}

const logoutHandler = (req,res) => {
  console.log(`POST ${req.originalUrl}`);
  res.status(200).json({successMessage: 'You have successfully loged out!'});
}

const changePasswordHandler = async(req,res) => {
  console.log(`PUT ${req.originalUrl}`);
  res.end();

}


router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.put("/:profileId/change-password", changePasswordHandler);
router.put("/:profileId/edit", editHandler);
router.use("/products", userProductsController);




module.exports = router;
