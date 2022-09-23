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
        if(!user) throw {status:400, mesage:'User with this id was not found!'}
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

const decrementProductQuantitys = async(products) => {
    for (const product of products) {
        const foundProduct = await getProduct(product._id);
        foundProduct.sizes[product.size] -= product.quantity;
        await productServices.findByIdAndUpdate(foundProduct,foundProduct._id);
    }
}

const updateUserProfile = async(user,order) => {
    user.cart = [];
    user.orders.push({_id:order._id});
    console.log(user.orders);
    const updatedUser = await  userServices.findByIdAndUpdate(user._id,user);
    const populatedUser = await userServices.findByIdAndPopulate(updatedUser._id);
    return populatedUser;
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
        await decrementProductQuantitys(formatedProducts)
        if(!isAnonymousRequest) {
            const populatedUser = await updateUserProfile(user,order);
            return res.status(200).json({message:"You successfully made an order.", user:populatedUser});
        }
        if(isAnonymousRequest) return res.status(200).json({message:"You successfully made an order."});
    }catch(err){
        if(err.status) res.status(err.status).json({message:err.message});
        if(err.path === "_id") res.status(400).json({message:"Some if the id's you provided is not in valid format"});
        console.log(err);
    }

}



router.post('/create',createOrderHandler)

module.exports = router;