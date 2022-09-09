const router = require('express').Router();

const productsServices = require('../services/productsServices')


const getManyHandler = async(req,res) => {
    console.log(`GET ${req.originalUrl}`);
    const gender = req.path.split('/')[1];
    try{
        if(gender !== 'men' && gender !== 'women' && gender !=='boys' && gender !== 'girls'){
            throw {status:400, message:'No such gender found in database!'}
        }
        const dbResponse = await productsServices.findByGender(gender);
        res.status(200).json(dbResponse);
    }catch(err){
        res.status(err.status).json({message:err.message})
    }
};
const getOneHandler = async(req,res) => {
    console.log(`GET ${req.originalUrl}`);
    const {productId} = req.params
    try{
        const dbResponse = await productsServices.getOne(productId)
        res.status(200).json(dbResponse)
    } catch(err){
    res.status(404).json({ message: "Product with this id was not found!" });
    }
    res.end();
}





router.get(["/men","/women","/kids","/boys"], getManyHandler)
router.get("/:productId", getOneHandler)

module.exports = router; 