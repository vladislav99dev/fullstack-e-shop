const router = require("express").Router();

const productsServices = require("../services/productsServices");

const createProductHandler = async (req, res) => {
  console.log(`POST ${req.originalUrl}`);
  const data =
    req.body;
  if (
    !data.type ||
    !data.category ||
    !data.gender ||
    !data.brand ||
    !data.imageUrl ||
    !data.color ||
    !data.price ||
    !data.sizes
  )
    return res.status(400).json({
      creationFailed: true,
      message:
        "Type, category, brand, gender, imageUrl, color, price, sizes should be provided in order to continue!",
    });
  try {
    const dbResponse = await productsServices.create(data);
    res.status(201).json(dbResponse);
  } catch (err) {
    console.log(err);
    let error = err._message;
    let errors = Object.values(err.errors);
    let specifficError = errors[0].properties.message;
    res.status(400).json({ error, specifficError });
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

  if (
    !data.type ||
    !data.category ||
    !data.gender ||
    !data.brand ||
    !data.imageUrl ||
    !data.color ||
    !data.price ||
    !data.sizes
  )
    return res.status(400).json({
      creationFailed: true,
      message:
        "Type, category, brand, gender, imageUrl, color, price, sizes should be provided in order to continue!",
    });

  try {
    const dbResponse = await productsServices.findOneAndUpdate(
      data,
      params.productId
    );
    res.status(200).json(dbResponse);
  } catch (err) {
    res.status(404).json({ message: "Product with this id was not found!" });
    console.log(err);
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
