const router = require("express").Router();

const productDataValidation = require("../validations/productDataValidation");
const productServices = require("../services/products/productsServices");
const orderServices = require("../services/orders/orderServices");


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
    const product = await productServices.findById(productId);
    product.inStock = false;
    for (const size in product.sizes) {
      product.sizes[size] = 0
      
    }
    await productServices.findByIdAndUpdate(product._id,product);

    res.status(200).json({message:"You successfully deleteted this product!"});

  }catch(err){
    if(err.path === "_id") res.status(400).json({message:"ProductId is not in valid format"});
    if(err.status) return res.status(err.status).json({message:err.message});
    console.log(err);
  }
}


const editOrderHandler = async (req,res) => {
  console.log(`EDIT ${req.originalUrl}`);

  const {orderId} = req.params;
  const {status} = req.body;

  try {
    const order = await orderServices.findById(orderId);

  } catch (error) {
    if(err.path === "_id") res.status(400).json({message:"ProductId is not in valid format"});
    if(err.status) return res.status(err.status).json({message:err.message});
  }

}

const getAllOrdersHandler = async(req,res) => {
  console.log(`GET ${req.originalUrl}`);
  const  orders = await orderServices.getAll();
  for (const order of orders) {
    if(order.profileId) {
      order.profileId.password = null
    }
  }
  res.status(200).json([...orders])
  res.end();
}

const checkAccessToken = async (req,res) => {
    console.log(`POST ${req.originalUrl}`);
    return res.status(200).json({isAdmin:true});
}

router.post("/checkToken", checkAccessToken);

router.post("/products/create", createProductHandler);
router.put("/products/:productId/edit", editProductHandler);
router.delete("/products/:productId/delete", deleteProductHandler);

router.post("/orders", getAllOrdersHandler);
router.put("/orders/:orderId", editOrderHandler);



module.exports = router;
