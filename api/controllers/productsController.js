const router = require('express').Router();

const productsServices = require('../services/productsServices')


const getManyHandler = async(req,res) => {
    console.log(`GET ${req.originalUrl}`);
    const gender = req.path.split('/')[1];
    try{
        if(gender !== 'men' && gender !== 'women' && gender !=='boys' && gender !== 'girls' && gender !== 'all'){
            throw {status:400, message:'No such gender found in database!'}
        }
        if(gender === 'all') {
            const allProducts = await productsServices.findAll();
            return res.status(200).json(allProducts);
        }
        const products = await productsServices.findByGender(gender);
        res.status(200).json(products);
    }catch(err){
        if(err.status) return res.status(err.status).json({message:err.message});
        console.log(err)
    }
};

const getManyFiltered = async(req,res) => {
    console.log(`POST ${req.originalUrl}`);
    const data = req.body;

    const extractEmptyPropertiesAndSizes = (data) => {
        const sizes = [...data.sizes];
        for (const prop in data) {
            if(data[prop] === '' || Array.isArray(data[prop])) delete data[prop];
        }
        return [data,sizes]
    }
    const filterProductsBySizes = (products) => {
        for (const product of products) {
            for (let i = 0; i < sizes.length; i++) {
                let currSize = sizes[i];
                if(product.sizes[currSize] > 0){
                    break;
                }
                if(i  === sizes.length - 1){
                    products = products.filter(x => x !== product)
                }
            }
        }
        return products
    }

    let [modifiedData,sizes] = extractEmptyPropertiesAndSizes(data);

    try {
        let products = await productsServices.findByFilter(modifiedData)
        if(products.length  === 0) return res.status(200).json({products:products})
        const sizeFilteredProducts = filterProductsBySizes(products);
        if(sizeFilteredProducts.length  === 0) return res.status(200).json({products:sizeFilteredProducts})
        return res.status(200).json(sizeFilteredProducts)
    } catch(err){
        console.log(err);
    }
    res.end();
}

const getOneHandler = async(req,res) => {
    console.log(`GET ${req.originalUrl}`);
    const {productId} = req.params
    try{
        const product = await productsServices.findById(productId);
        if(!product) throw {status:400, message:'There is no product with this id!'};
        res.status(200).json(product)
    } catch(err){
        if(err.status) return res.status(err.status).jsson({message:err.message})
        console.log(err)
    }
}




router.get(["/men","/women","/girls","/boys","/all"], getManyHandler)
router.post("/filter",getManyFiltered)
router.get("/:productId", getOneHandler)

module.exports = router; 