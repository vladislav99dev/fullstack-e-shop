const router = require('express').Router();

const productsServices = require('../services/productsServices');
const userServices = require('../services/userServices')


const addHandler = async(service,req,res) => {
    console.log(`POST ${req.originalUrl}`);
    const {profileId, productId} = req.body;
    try {
        const user = await userServices.findById(profileId);
        if(!user) return res.status(400).json({message: "There is no user with this id!"});
        const product = await productsServices.getOne(productId);
        if(!product) return res.status(400).json({message: "There is no product with this id!"});
        if(user[service].includes(productId)) return res.status(409).json({message:`This product is already added to ${service}!`});
        if(!user[service].includes(productId)) user[service].push(productId);
        const dbResponse = await userServices.findByIdAndUpdate(user,profileId);
        res.status(200).json({message:`Successfully added this product to ${service}.`});
    } catch (err) {
        console.log(err);
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."});
    }
}

const removeHandler = async(service,req,res) => {
    console.log(`POST ${req.originalUrl}`);
    const {profileId, productId} = req.body;
    try {
        const user = await userServices.findById(profileId);
        if(!user) return res.status(400).json({message: "There is no user with this id!"});
        if(!user[service].includes(productId)) return res.status(404).json({message:"This user does not have favourite product with this id!"});
        if(user[service].includes(productId)) {
        const index = user[service].indexOf(productId);
        user[service].splice(index,1);
        }
        const dbResponse = await userServices.findByIdAndUpdate(user,profileId);
        res.status(200).json({message:`Successfully removed this product from ${service}.`});
    } catch(err){
        console.log(err);
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."});
    }
};

const getHandler = async(service,req,res) => {
    console.log(`POST ${req.originalUrl}`);
    const {profileId} = req.body;
    try {
        const user = await userServices.findByIdPopulated(profileId,service);
        if(!user) return res.status(400).json({message: "There is no user with this id!"});
        res.status(200).json(user)
    }catch(err) {
        console.log(err);
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."});
    }
};


const addFavouriteHandler = addHandler.bind(null,"favourites");
const addCartHandler = addHandler.bind(null,"cart");

const removeFavouriteHandler = removeHandler.bind(null,"favourite")
const removeCartHandler = removeHandler.bind(null,"cart")


const getFavouriteHandler = getHandler.bind(null,'favourites')
const getCartHandler = getHandler.bind(null,'cart')



router.get('/favourites-get', getFavouriteHandler)
router.post('/favourites-add', addFavouriteHandler)
router.post('/favourites-remove', removeFavouriteHandler)

router.get('/cart-get', getCartHandler)
router.post('/cart-add', addCartHandler)
router.post('/cart-remove', removeCartHandler)



module.exports = router












// const createFavouriteHandler = async(req,res) => {
//     console.log(`POST ${req.originalUrl}`);
//     const {profileId, productId} = req.body
//     try {
//         const user = await userServices.findById(profileId)
//         const isUserFound = Boolean(user)
//         if(!isUserFound) return res.status(400).json({message: "There is no user with this email!"})
//         const product = await productsServices.getOne(productId)
//         const isProductFound = Boolean(product)
//         if(!isProductFound) return res.status(400).json({message: "There is no product with this id!"})
//         if(user.favourites.includes(productId)) return res.status(409).json({message:"This product is already added to favourites!"})
//         if(!user.favourites.includes(productId)) user.favourites.push(productId)
//         const dbResponse = await userServices.findByIdAndUpdate(user,profileId);
//         res.status(200).json({message:"Successfully added this product to favourites."})
//     } catch (err) {
//         if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."})
//         console.log(err);
//     }
// }

// const deleteFavouriteHandler = async(req,res) => {
//     console.log(`POST ${req.originalUrl}`);
//     const {profileId, productId} = req.body
//     try {
//         const user = await userServices.findById(profileId)
//         const isUserFound = Boolean(user)
//         if(!isUserFound) return res.status(400).json({message: "There is no user with this id!"})
//         if(!user.favourites.includes(productId)) return res.status(404).json({message:"This user does not have favourite product with this id!"})
//         if(user.favourites.includes(productId)) {
//             const index = user.favourites.indexOf(productId)
//             user.favourites.splice(index,1)
//         }
//         const dbResponse = await userServices.findByIdAndUpdate(user,profileId)
//         res.status(200).json({message:"Successfully removed this product from favourites."})
//     } catch (err) {
//         console.log(err);
//         if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."})
        
//     }
// }


// const getFavouritesHandler = async(req,res) => {
//     const {profileId} = req.body
//     try {
//         const user = await userServices.findByIdPopulated(profileId)
//         const isUserFound = Boolean(user)
//         if(!isUserFound) return res.status(400).json({message: "There is no user with this id!"})
//         res.status(200).json(user)
//         console.log(err);
//     }catch(err) {
//         if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."})
//     }
// }