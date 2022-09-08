const router = require("express").Router();

const productsServices = require("../services/productsServices");

const dataValidationServices = require("../services/dataValidationServices")


const createProductHandler = async (req, res) => {
  console.log(`POST ${req.originalUrl}`);
  const data =
    req.body;
    try{
      let validatedData = dataValidationServices.validateAllData(data)
      // const validatedAndFormatedData = dataValidationServices.validateAndFormatDataSizes(data);
      const dbResponse = await productsServices.create(validatedData);
      res.status(201).json(dbResponse);
    }catch(err){
      console.log(err);
      res.status(err.status).json({message: err.message})
    }
};

const getOneProductHandler = async (req, res) => {
  console.log(`GET ${req.originalUrl}`);
  const params = req.params;
  try {
    const dbResponse = await productsServices.getOne(params.productId);
    res.status(200).json(dbResponse);
  } catch (err) {
    res.status(404).json({ message: "Product with this id was not found!" });
  }
};

const editProductHandler = async (req, res) => {
  console.log(`PUT ${req.originalUrl}`);
  const data = req.body;
  const params = req.params;

  try {
    const validatedData = dataValidationServices.validateAllData(data)
    // const validatedAndFormatedData = dataValidationServices.validateAndFormatDataSizes(data);
    const dbResponse = await productsServices.findOneAndUpdate(
      validatedData,
      params.productId
    );
    res.status(200).json(dbResponse);
  } catch (err) {
    if(err.path === '_id') return res.status(404).json({message:"Product with this id does not exist!"})
    res.status(err.status).json({ message:err.message});
  }
};


const deleteProductHandler = async(req,res) => {
  const params = req.params;
  try {
    const dbResponse = await productsServices.deleteOne(params.productId)
    if(dbResponse === null) return res.status(404).json({message:'Product with this id was not found!'})
    res.status(200).json({message:"You successfully deleteted this product!"})
  }catch(err){
    res.status(404).json({message:'Product with this id was not found!'})
  }
}

router.post("/products/create", createProductHandler);
router.put("/products/:productId/edit", editProductHandler);
router.get("/products/:productId", getOneProductHandler);
router.delete("/products/:productId/delete", deleteProductHandler);


module.exports = router;
