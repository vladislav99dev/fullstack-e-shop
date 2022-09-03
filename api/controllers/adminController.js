const router = require("express").Router();

const productsServices = require("../services/productsServices");

const productHandler = async (req, res) => {
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
    return res.status(201).json(dbResponse);
  } catch (err) {
    console.log(err)
    let error = err._message;
    let errors = Object.values(err.errors);
    let specifficError = errors[0].properties.message;
    res.status(400).json({ error, specifficError });
  }
};

router.post("/products/create", productHandler);

module.exports = router;
