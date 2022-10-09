const router = require("express").Router();

const userDataValidation = require("../validations/userDataValidation");

const findUserByEmail = require("../utils/users/findUserByEmail");
const createUser = require("../utils/users/createUser")
const findUserById = require("../utils/users/findUserById");
const findUserByIdAndUpdate = require("../utils/users/findUserByIdAndUpdate");
const findUserByIdAndPopulate = require("../utils/users/findUserByIdAndPopulate");
const checkUserPassword = require("../utils/users/checkUserPassword");
const findUserByIdAndUpdatePassword = require("../utils/users/findUserByIdAndUpdatePassword");
const checkIfEmailRegistered = require("../utils/users/checkIfEmailRegistered");

const findUserAccessToken = require("../utils/tokens/findUserAccessToken");
const createUserAccessToken = require("../utils/tokens/createUserAccessToken");
const verifyAccessToken = require("../utils/tokens/verifyAccessToken");
const deleteUserAccessToken = require("../utils/tokens/deleteUserAccessToken");

const userProductsController = require("./userProductsController");



const registerHandler = async(req,res)=> {
  console.log(`POST ${req.originalUrl}`);

  const data = req.body;

  try {
      userDataValidation.validateRegisterData(data);

      await checkIfEmailRegistered(data.email);
      
      await createUser(data);
      
      return res.status(201).json({message:"You successfully created new user profile!"});

  } catch(err){
      if(err.status) res.status(err.status).json({message:err.message});
  }
}

const editHandler = async(req,res) => {
  console.log(`PUT ${req.originalUrl}`);

  const {profileId} = req.params;
  const data = req.body;

  try{
    const user = await findUserById(profileId);
    
    const token = await findUserAccessToken(profileId);

    await verifyAccessToken(user,token)

    userDataValidation.validateEditData(data);

    await findUserByIdAndUpdate(user._id,data);

    const populatedUser = await findUserByIdAndPopulate(profileId);

    return res.status(200).json({message:"You successfully updated your profile!",user:populatedUser});

  }catch(err) {
    if(err.status) return res.status(err.status).json({message:err.message});
  }
}

const loginHandler = async(req,res) => {
  console.log(`POST ${req.originalUrl}`);

  const data = req.body;

  try {
    userDataValidation.validateLoginData(data);

    const user = await findUserByEmail(data.email);

    await checkUserPassword(data.password,user.password)

    await createUserAccessToken(user);

    const populatedUser = await findUserByIdAndPopulate(user._id);

    return res.status(200).json({user:populatedUser,message:'You have successfully logged in!'});
  
  } catch(err){
    if(err.status) return  res.status(err.status).json({message:err.message});
  }
}

const changePasswordHandler = async(req,res) => {
  console.log(`PUT ${req.originalUrl}`);

  const {profileId} = req.params;
  const {oldPassword,newPassword,repeatNewPassword} = req.body;
  
  if(newPassword !== repeatNewPassword) return res.status(400).json({message:"Passwords does not match!"});

  try {
    const user = await findUserById(profileId);

    const [{token}] = await findUserAccessToken(user._id)

    await verifyAccessToken(user,token)

    await checkUserPassword(oldPassword,user.password);

    user.password = newPassword;

    const updatedUser = await findUserByIdAndUpdatePassword(user);

    const populatedUser = await findUserByIdAndPopulate(user._id);
    
    return res.status(200).json({user:populatedUser,message:"You successfully updated your password!"});
  }catch(err) {
    if(err.status) return res.status(err.status).json({message:err.message})
    console.log(err)
  }
}


const logoutHandler = async(req,res) => {
  console.log(`POST ${req.originalUrl}`);

  const {profileId} = req.params;

  try{
    const user = await findUserById(profileId);
    console.log(user);
    const [{token}] = await findUserAccessToken(user._id);

    await verifyAccessToken(user,token);

    await deleteUserAccessToken(user._id);

    return res.status(200).json({successMessage: 'You have successfully loged out!'});
  } catch(err){
    if(err.status) return res.status(err.status).json({message:err.message})
  }
}


router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/:profileId/logout", logoutHandler);
router.put("/:profileId/change-password", changePasswordHandler);
router.put("/:profileId/edit", editHandler);
router.use("/products", userProductsController);


module.exports = router;

