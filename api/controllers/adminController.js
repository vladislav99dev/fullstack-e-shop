const router = require("express").Router();

const productsServices = require("../services/productsServices");

const createProductHandler = async (req, res) => {
  console.log(`POST ${req.originalUrl}`);
  const { type, category, gender, brand, imageUrl, color, price, sizes } =
    req.body;
    console.log( type, category, gender, brand, imageUrl, color, price, sizes )
  if (
    !type ||
    !category ||
    !gender ||
    !brand ||
    !imageUrl ||
    !color ||
    !price ||
    !sizes
  )
    return res
      .status(400)
      .json({
        creationFailed:true,
        message:
          "Type, category, brand, gender, imageUrl, color, price, sizes should be provided in order to continue!",
      });
  try {
    console.log('trying')
    const dbResponse = await productsServices.create(
      type,
      category,
      gender,
      brand,
      imageUrl,
      color,
      price,
      sizes
    );
     res.status(201).json(dbResponse);
  } catch (err) {
    console.log(err)
    let error = err._message;
    let errors = Object.values(err.errors);
    let specifficError = errors[0].properties.message;
    res.status(400).json({ error, specifficError });
  }
};

const getOneProductHandler = async(req,res) => {
  console.log(`POST ${req.originalUrl}`);
  
  const params = req.params;
  try{
    const dbResponse = await productsServices.getOne(params.productId)
    res.status(200).json(dbResponse);
  }catch(err){
    res.status(404).json({message:'Product with this id was not found!'});
  }
}; 


const editHandler = async(req,res) => {
  console.log(`POST ${req.originalUrl}`);

  const data =
  req.body;

  const params = req.params;
  try{
    const dbResponse = await productsServices.findOneAndUpdate(data,params.productId)
    console.log(dbResponse);
    res.status(200).json(dbResponse);
  }catch(err){
    console.log(err);
  }
}




router.post("/products/create", createProductHandler);
router.put("/products/:productId/edit", editHandler);
router.get("/products/:productId/", getOneProductHandler);



module.exports = router;
