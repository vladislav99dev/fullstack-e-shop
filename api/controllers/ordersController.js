const router = require('express').Router();


const userServices = require("../services/userServices");
const productServices = require("../services/productsServices");
const orderSerices = require("../services/orderServices");

const orderDataValidation = require("../services/validations/orderDataValidation")

const getPopulatedProfile = async(profileId) => {
    const user = await userServices.findByIdAndPopulate(profileId);
    if(!user) throw {status:400, message:'There is no user with this id!'};
    return user;
}

const getProduct = async(productId) => {
    const product = await productServices.findById(productId);
    if(!product) throw {status:400,message:'There is no product with this id!'}
    return product;
}

const extractProductsAndFindIfAnonymous = async(data) => {
    let isAnonymousRequest = Boolean(!data.profileId);
    let productsWanted = []
    let user ;
    if(isAnonymousRequest) productsWanted = [...data.products];
    if(!isAnonymousRequest) {
        user = await getPopulatedProfile(data.profileId);
        productsWanted = [...user.cart]
    }
    return {isAnonymousRequest,productsWanted,user}
}

const formatEachProduct = (product) => {
    Object.assign(product,{size:product.size,quantity:product.quantity,product:product._id})
    delete product._id;
    return product;
}

const checkIfSizesAvailible = async(isAnonymousRequest, productsWanted) => {
    let products = [];
    for (let productWanted of productsWanted) {
        if(!isAnonymousRequest) {
            productWanted = formatEachProduct(productWanted);
        }
        const productDocument = await getProduct(productWanted.product._id);
        if(productDocument.sizes[productWanted.size] < productWanted.quantity) throw {status:400,
        message:`There is not enough quantity from ${productWanted.product.name} for size ${productWanted.size}.There are only ${productDocument.sizes[productWanted.size]} left.`}
        products.push(productWanted);
    }
    return products;
}

const formatProductsForDb = (products) => {
    const formatedProducts = products.map((product) => {
        return {_id:product.product._id, size:product.size, quantity:product.quantity}
    })
    return formatedProducts;
}


const createOrderHandler = async(req,res) => {
    console.log(`POST ${req.originalUrl}`);
    const data = req.body;
    try{
        orderDataValidation.validateOrderData(data); 
        const {isAnonymousRequest,productsWanted,user} = await extractProductsAndFindIfAnonymous(data);
        const products = await checkIfSizesAvailible(isAnonymousRequest,productsWanted);
        const formatedProducts  = formatProductsForDb(products);
        const order = await orderSerices.create({...data,productsOrdered:[...formatedProducts]});
        console.log(order._id);
        if(!isAnonymousRequest) {
            user.cart = [];
            user.orders.push({_id:order._id});
            console.log(user.orders);
            const updatedUser = await  userServices.findByIdAndUpdate(user._id,user);
            const populatedUser = await userServices.findByIdAndPopulate(updatedUser._id);
            return res.status(200).json({message:"Successfully made an order", user:populatedUser})
        }
        //if not logged in just response with message
    }catch(err){
        console.log(err)
        console.log('err');
    }

}



router.post('/create',createOrderHandler)

module.exports = router;