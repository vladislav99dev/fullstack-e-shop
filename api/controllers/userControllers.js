const router = require("express").Router();
const bcrypt = require("bcrypt");

const userServices = require("../services/userServices");
const tokenServices = require("../services/tokenServices");

const userProductsController = require("../controllers/userProductsController")

const registerHandler = async(req,res)=> {
  console.log(`POST ${req.originalUrl}`);
  const { firstName, lastName, password, email, country, city, street } = req.body;
  if(!firstName || !lastName || !password || !email || !country || !city || !street) 
  return res.status(400)
  .json({error:'FisrtName, LastName, Password, Email, Country, City and Street need to be provided in order to continue!'});
      try {
          const user = await userServices.findByEmail(email);
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
        const user = await userServices.findByEmail(email);

        const isUserFound = Boolean(user);
        if(!isUserFound) return res.status(404).json({error:'Incorrect email or password'});
        
        const isValid = await bcrypt.compare(password,user.password);
        if(!isValid) return res.status(404).json({error:'Incorrect email or password'});
        
        delete user.password
        if(user.isAdmin){
          const accessToken = tokenServices.generate(user);
          user.accessToken = accessToken
          return res.status(200).json(user);
        } else {
          return res.status(200).json(user);
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

