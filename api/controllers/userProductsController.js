const router = require('express').Router();

const productsServices = require('../services/productsServices');
const userServices = require('../services/userServices')


const addFavouriteHandler = async(req,res) => {
    console.log(`POST ${req.originalUrl}`);
    const {profileId, productId} = req.body
    try {
        const user = await userServices.findById(profileId)
        const isUserFound = Boolean(user)
        if(!isUserFound) return res.status(400).json({message: "There is no user with this email!"})
        const product = await productsServices.getOne(productId)
        const isProductFound = Boolean(product)
        if(!isProductFound) return res.status(400).json({message: "There is no product with this id!"})
        if(!user.favourites.includes(productId)) user.favourites.push(productId)
        if(user.favourites.includes(productId)) return res.status(409).json({message:"This products is already added to favourites!"})
        const dbResponse = await userServices.findByIdAndUpdate(user,profileId);
        res.status(200).json({message:"Successfully added this product to favourites."})
    } catch (err) {
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."})
        console.log(err);
    }
}



router.post('/favourites-add', addFavouriteHandler)

module.exports = router