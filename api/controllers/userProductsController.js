const router = require('express').Router();

const productsServices = require('../services/productsServices');
const userServices = require('../services/userServices');

const isLoggedIn = require('../middlewares/isLoggedIn');


const isProfileIdValid = async(profileid) => {
    const user = await userServices.findById(profileid);
    if(!user) throw {status:400, message:'There is no user with this id!'};
    return user;
}

const isProductIdValid = async(productId) => {
    const product = await productsServices.findById(productId);
    if(!product) throw {status:400, message:'There is no product with this id!'};
    return product;
}

const updateAndPopulateUserProfile = async(user) => {
    const updatedUser = await userServices.findByIdAndUpdate(user._id,user);
    const {password, ...populatedUser} = await userServices.findByIdAndPopulate(updatedUser._id);
    return populatedUser;
}

const isSizeValid = (product,size) => {
    if(!product.sizes.hasOwnProperty(size)) throw {status:400, message:'You have entered invalid size!'}
}

const removeOldCartProduct = (user,product) =>{
    const indexOfProduct = user["cart"].indexOf(product);
    user["cart"].splice(indexOfProduct,1);
    return user;
}

const productWithSameSizeHandler = (service,user,productId,size,quantity) => {
    for (const cartProduct of user["cart"]) {
        if(String(cartProduct._id).includes(productId) && cartProduct.size === size){
            if(service === 'add'){
                const incrementedQtyProduct = Object.assign({},{
                    size:cartProduct.size,
                    quantity:cartProduct.quantity + quantity,
                    _id:cartProduct._id
                })
                const updatedUser = removeOldCartProduct(user,cartProduct);
                updatedUser["cart"].push(incrementedQtyProduct);
                return {isUpdated:true, profile:updatedUser};
            }
            
            if(service === 'remove'){
                const updatedUser = removeOldCartProduct(user,cartProduct);
                return {isUpdated:true, profile:updatedUser};
            }

        }
    }
    return {isUpdated:false, profile:user};
}

const removeProductWithSameSizeHandler = productWithSameSizeHandler.bind(null,"remove");
const addProductWithSameSizeHandler = productWithSameSizeHandler.bind(null,"add");


const addToCartHandler = async(req,res) => {
    console.log(`POST ${req.originalUrl}`);
    
    const {profileId,size,quantity} = req.body;
    const {productId} = req.params;

    try{
        const user = await isProfileIdValid(profileId);
        const product = await isProductIdValid(productId);

        isSizeValid(product,size);

        const {isUpdated, profile} = addProductWithSameSizeHandler(user,productId,size,quantity);
        if(!isUpdated) profile["cart"].push({_id:productId,size:size,quantity:quantity});

        const modifiedUser = await updateAndPopulateUserProfile(profile);
        if(modifiedUser.isAdmin) modifiedUser.accessToken = tokenServices.generate(modifiedUser);
        res.status(200).json({message: `Successfully added ${product.name} ${product.category} from ${size}`, user:modifiedUser});
    }catch(err){
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."});
        if(err.status) return res.status(err.status).json({message:err.message});
        console.log(err);
    }
}

const removeFromCartHandler = async(req,res) => {
    console.log(`DELETE ${req.originalUrl}`);
    
    const {profileId, size} = req.body;
    const {productId} = req.params;

    try{
        const user = await isProfileIdValid(profileId);
        const product = await isProductIdValid(productId);

        const {isUpdated,profile} = await removeProductWithSameSizeHandler(user,productId,size);
        if(!isUpdated) throw {status:404, message:`There was no found product in this profile with this id!`};

        const modifiedUser = await updateAndPopulateUserProfile(profile);
        if(modifiedUser.isAdmin) modifiedUser.accessToken = tokenServices.generate(modifiedUser);
        res.status(200).json({message:`Successfully removed ${product.name} from profile cart.`, user:modifiedUser});
    }catch(err){
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."});
        if(err.status) return res.status(err.status).json({message:err.message});
        console.log(err);
    }
}

const addToFavouritesHandler = async(req,res) => {
    console.log(`POST ${req.originalUrl}`);

    const {profileId} = req.body;
    const {productId} = req.params;

    try{
        const user = await isProfileIdValid(profileId);
        const product = await isProductIdValid(productId);

        if(user["favourites"].includes(productId)) throw {status:409, message:`Product ${product.name} is already added to favourites!`};
        user["favourites"].push(productId);

        const modifiedUser = await updateAndPopulateUserProfile(user);
        if(modifiedUser.isAdmin) modifiedUser.accessToken = tokenServices.generate(modifiedUser);
        res.status(200).json({message:`Successfully added ${product.name} to your profile.`, user:modifiedUser});
    }catch(err){
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."})
        if(err.status) return res.status(err.status).json({message:err.message});
        console.log(err)
    }
}

const removeFromFavouritesHandler = async(req,res) => {
    console.log(`DELETE ${req.originalUrl}`);
    const {profileId} = req.body;
    const {productId} = req.params;

    try {
        const user = await isProfileIdValid(profileId);
        const product = await isProductIdValid(productId);

        if(!user["favourites"].includes(productId)) throw {status:404,message:`Product ${product.name} is not found in profile favourites!`};
        const indexOfProduct = user["favourites"].indexOf(productId);
        user["favourites"].splice(indexOfProduct,1)

        const modifiedUser = await updateAndPopulateUserProfile(user);
        if(modifiedUser.isAdmin) modifiedUser.accessToken = tokenServices.generate(modifiedUser);
        res.status(200).json({message:`Successfully removed ${product.name} from your profile.`, user:modifiedUser})
    } catch (err) {
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."})
        if(err.status) return res.status(err.status).json({message:err.message});
        console.log(err)
    }
}




router.post('/:productId/favourites-add', isLoggedIn, addToFavouritesHandler)
router.delete('/:productId/favourites-remove', isLoggedIn, removeFromFavouritesHandler)

router.post('/:productId/cart-add', isLoggedIn, addToCartHandler)
router.delete('/:productId/cart-remove', isLoggedIn, removeFromCartHandler)



module.exports = router




