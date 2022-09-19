const router = require("express").Router();
const bcrypt = require("bcrypt");

const userServices = require("../services/userServices");
const tokenServices = require("../services/tokenServices");

const userProductsController = require("../controllers/userProductsController")
const userDataValidation = require("../services/validations/userDataValidation")


const registerHandler = async(req,res)=> {
    console.log(`POST ${req.originalUrl}`);
    const data = req.body;
      try {
          userDataValidation.validateAllData(data)

          const user = await userServices.findByEmail(data.email);
          if(user) throw {type:'conflict', message:'User with this email already exist!'};

          await userServices.create(data);
          return res.status(201).json({message:"You successfully created new user profile!"});
      } catch(err){
          if(err.type === 'validation') return res.status(400).json({message:err.message});
          if(err.type === 'conflict') return res.status(409).json({message:err.message});
      }
}


const loginHandler = async(req,res) => {
  console.log(`POST ${req.originalUrl}`);
  const {email,password} = req.body;
  if(!email || !password) return res.status(400).json({error:'Email and Password are required in order to continue'});

    try {
        const user = await userServices.findByEmail(email);

        const isUserFound = Boolean(user);
        if(!isUserFound) return res.status(404).json({error:'Incorrect email or password'});
        
        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid) return res.status(404).json({error:'Incorrect email or password'});

        const populatedUser = await userServices.findByIdPopulated(user._id)
        
        populatedUser.password = null
        user.password = null
        if(populatedUser.isAdmin){
          const accessToken = tokenServices.generate(user);
          return res.status(200).json({...populatedUser,accessToken});
        } else {
          return res.status(200).json(populatedUser);
        }

    } catch(err){
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

const logoutHandler = (req,res) => {
  console.log(`POST ${req.originalUrl}`);
  res.status(200).json({successMessage: 'You have successfully loged out!'});
}




router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.use("/products", userProductsController);
// router.post("/logout-admin", logoutAdminHandler);
// router.post("/add-product/cart", logoutAdminHandler);




module.exports = router;

