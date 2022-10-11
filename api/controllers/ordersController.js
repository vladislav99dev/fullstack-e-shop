const router = require('express').Router();


const userServices = require("../services/user/userServices");
const productServices = require("../services/products/productsServices");
const orderServices = require("../services/orders/orderServices");

const orderDataValidation = require("../validations/orderDataValidation")

const formatNonUserProducts = require("../utils/orders/formatNonUserProducts");
const formatUserBeforeUpdate = require("../utils/orders/formatUserBeforeUpdate");


const createOrderHandler = async(req,res) => {
    console.log(`POST ${req.originalUrl}`);

    const data = req.body;

    try{

        orderDataValidation.validateOrderData(data); 

        const isUserRequest = Boolean(data.profileId);

        if(isUserRequest) {
            const user = await userServices.findById(data.profileId);

            const productsWanted = [...user.cart];

            const order = await orderServices.create({profileId:user._id,productsOrdered:productsWanted});

            const formatedUser = formatUserBeforeUpdate(user,order._id);

            await userServices.findByIdAndUpdate(user._id,formatedUser);

            const populatedUser = await userServices.findByIdAndPopulate(user._id);

            return res.status(201).json({message:'You successfully made an order!',user:populatedUser});
        }

        if(!isUserRequest) { 
            const productsWanted = formatNonUserProducts(data.products);

            await orderServices.create({...data,productsOrdered:productsWanted})

            return res.status(201).json({message:'You successfully made an order!'});
        }
    }catch(err){
        if(err.path === "_id") res.status(400).json({message:"Some if the id's you provided is not in valid format"});
        if(err.status) res.status(err.status).json({message:err.message});
    }
}



router.post('/create',createOrderHandler)

module.exports = router;