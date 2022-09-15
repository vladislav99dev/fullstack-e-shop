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
            const dbResponse = await productsServices.findAll();
            return res.status(200).json(dbResponse);
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





router.get(["/men","/women","/girls","/boys","/all"], getManyHandler)
router.get("/:productId", getOneHandler)

module.exports = router; 