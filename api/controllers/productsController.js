const router = require('express').Router();


const findAllProducts = require("../utils/products/findAllProducts");
const findByGender = require("../utils/products/findByGender");
const findAndFilterProducts = require("../utils/products/findAndFilterProducts");
const findProductById = require("../utils/products/findProductById");
const extractEmptyPropsAndSizesFromFilter = require("../utils/products/extractEmptyPropsAndSizesFromFilter");
const filterProductsBySize = require("../utils/products/filterProductsBySize");


const getManyHandler = async(req,res) => {
    console.log(`GET ${req.originalUrl}`);

    const gender = req.path.split('/')[1];

    let products = [];

    if(gender !== 'men' 
    && gender !== 'women' 
    && gender !=='boys' 
    && gender !== 'girls' 
    && gender !== 'all') return res.status(400).json({message:"No such gender found in database!"})

    try{
        if(gender === 'all') products = await findAllProducts();

        if(gender !== 'all') products = await findByGender(gender);

        res.status(200).json(products);
    }catch(err){
        if(err.status) return res.status(err.status).json({message:err.message});
    }
};

const getManyFiltered = async(req,res) => {
    console.log(`POST ${req.originalUrl}`);

    const data = req.body;

    const {filterData,filterSizes} = extractEmptyPropsAndSizesFromFilter(data);

    try {
        let products = await findAndFilterProducts(filterData);

        if(products.length === 0 ) return res.status(200).json({products:products});

        const sizeFilteredProducts = filterProductsBySize(products,filterSizes);

        if(sizeFilteredProducts.length === 0) return res.status(200).json({products:sizeFilteredProducts})

        return res.status(200).json({products:sizeFilteredProducts});
    } catch(err){
        if(err.status) return res.status(err.status).json({message:err.message});
    }
}


const getOneHandler = async(req,res) => {
    console.log(`GET ${req.originalUrl}`);

    const {productId} = req.params

    try{
        const product = await findProductById(productId);

        res.status(200).json(product)

    } catch(err){
        if(err.status) return res.status(err.status).jsson({message:err.message})
    }
}




router.get(["/men","/women","/girls","/boys","/all"], getManyHandler)
router.post("/filter",getManyFiltered)
router.get("/:productId", getOneHandler)

module.exports = router; 