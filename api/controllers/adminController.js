const router = require("express").Router();

const productDataValidation = require("../validations/productDataValidation")
const productServices = require("../services/products/productsServices");


const createProductHandler = async (req, res) => {
  console.log(`POST ${req.originalUrl}`);

  const data = req.body;

    try{
      productDataValidation.validateAllData(data);

      const newProduct = await productServices.create(data);

      return res.status(201).json(newProduct);

    }catch(err){
      if(err.status) return res.status(err.status).json({message: err.message})
    }
};

const editProductHandler = async (req, res) => {
  console.log(`PUT ${req.originalUrl}`);

  const data = req.body;

  const {productId} = req.params;

  try {
    productDataValidation.validateAllData(data);

    await productServices.findById(productId);

    await productServices.findByIdAndUpdate(productId,data);

    return res.status(200).json({message:`You successfully updated ${productId}!`});

  } catch (err) {
    if(err.path === "_id") res.status(400).json({message:"ProductId is not in valid format"});
    if(err.status) return res.status(err.status).json({ message:err.message});
  }
};


const deleteProductHandler = async(req,res) => {
  console.log(`DELETE ${req.originalUrl}`);

  const {productId} = req.params;

  try {
    await productServices.findById(productId);

    await productServices.deleteById(productId);

    res.status(200).json({message:"You successfully deleteted this product!"});

  }catch(err){
    if(err.path === "_id") res.status(400).json({message:"ProductId is not in valid format"});
    if(err.status) return res.status(err.status).json({message:err.message});
  }
}

const checkAccessToken = async (req,res) => {
    console.log(`POST ${req.originalUrl}`);
    
    return res.status(200).json({isAdmin:true});
}

router.post("/checkToken", checkAccessToken);
router.post("/products/create", createProductHandler);
router.put("/products/:productId/edit", editProductHandler);
router.delete("/products/:productId/delete", deleteProductHandler);


module.exports = router;
