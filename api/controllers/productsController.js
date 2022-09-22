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
router.get("/:productId", getOneHandler)

module.exports = router; 