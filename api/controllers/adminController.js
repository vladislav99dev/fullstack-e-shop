const router = require("express").Router();

const productsServices = require("../services/productsServices");

const productDataValidation = require("../services/validations/productDataValidation")


const createProductHandler = async (req, res) => {
  console.log(`POST ${req.originalUrl}`);
  const data =
    req.body;
    try{
      const validatedData = productDataValidation.validateAllData(data)
      const newProduct = await productsServices.create(validatedData);
      res.status(201).json(newProduct);
    }catch(err){
      if(err.status) return res.status(err.status).json({message: err.message})
    }
};

const editProductHandler = async (req, res) => {
  console.log(`PUT ${req.originalUrl}`);
  const data = req.body;
  const params = req.params;

  try {
    const validatedData = productDataValidation.validateAllData(data)
    const updatedProduct = await productsServices.findByIdAndUpdate(
      validatedData,
      params.productId
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    if(err.path === '_id') return res.status(404).json({message:"Product with this id does not exist!"})
    if(err.status) return res.status(err.status).json({ message:err.message});
  }
};


const deleteProductHandler = async(req,res) => {
  console.log(`DELETE ${req.originalUrl}`);

  const params = req.params;
  try {
    const deleteResponse = await productsServices.deleteById(params.productId)
    res.status(200).json({message:"You successfully deleteted this product!"})
  }catch(err){
    if(err.path === '_id') return  res.status(404).json({message:'Product with this id was not found!'});
  }
}

const checkAccessToken = async (req,res) => {
    console.log(`GET ${req.originalUrl}`);
    return res.status(200).json({isAdmin:true});
}

router.get("/checkToken", checkAccessToken);
router.post("/products/create", createProductHandler);
router.put("/products/:productId/edit", editProductHandler);
router.delete("/products/:productId/delete", deleteProductHandler);


module.exports = router;
