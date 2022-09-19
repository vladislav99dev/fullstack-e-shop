const router = require('express').Router();

const productsServices = require('../services/productsServices');
const userServices = require('../services/userServices')

const isLoggedIn = require('../middlewares/isLoggedIn');

const addHandler = async(service,req,res) => {
    console.log(`POST ${req.originalUrl}`);
    const {profileId, size, quantity} = req.body;
    const {productId} = req.params;
    if(!productId) return res.status(400).json({message:"Product id was not provieded!"})
    try {
        const user = await userServices.findById(profileId);
        if(!user) return res.status(400).json({message: "There is no user with this id!"});
        
        const product = await productsServices.getOne(productId);
        if(!product) return res.status(400).json({message: "There is no product with this id!"});
        
        if(service === 'favourites') {
            if(user[service].includes(productId)) return res.status(409).json({message:`This product is already added to ${service}!`});
            if(!user[service].includes(productId)) user[service].push(productId);
        }

        if(service === 'cart') {
            let newCartProduct = {};
            let isAlreadyAdded = false

            if(!product.sizes.hasOwnProperty(size)) return res.status(400).json({message: "You have entered invalid size!"});

            
            for (const orderDetails of user[service]) {
                if(String(orderDetails._id).includes(productId) && orderDetails.size === size) {
                    Object.assign(newCartProduct, {size:orderDetails.size, quantity: orderDetails.quantity + quantity,_id:orderDetails._id})
                    isAlreadyAdded = true;
                    const foundElementIndex = user[service].indexOf(orderDetails);
                    user[service].splice(foundElementIndex,1);
                    break;
                }
            }

            
            if(product.sizes[size] < newCartProduct.quantity  || product.sizes[size] < quantity )
            return res.status(400).json({message: `There are only ${product.sizes[size]} left from ${product.name} ${product.category} from size ${size}!`})
            
            if(isAlreadyAdded) user[service].push((newCartProduct))
            if(!isAlreadyAdded) user[service].push({_id:productId,size:size,quantity:quantity})

        }

        const dbResponse = await userServices.findByIdAndUpdate(user,profileId);
        const updatedUser = await userServices.findByIdPopulated(profileId);
        updatedUser.password = null
        if(!updatedUser) return res.status(400).json({message: "There is no user with this id!"});
        res.status(200).json({message:`Successfully added ${product.name} ${product.category} from ${size}  to ${service}.`, user:updatedUser});
    } catch (err) {
        console.log(err);
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."});
    }
}

const removeHandler = async(service,req,res) => {
    console.log(`DELETE ${req.originalUrl}`);

    const {profileId, size} = req.body;
    const {productId} = req.params;

    try {
        const user = await userServices.findById(profileId);
        if(!user) return res.status(400).json({message: "There is no user with this id!"});

        const product = await productsServices.getOne(productId);
        if(!product)  return res.status(400).json({message:"There is no product with this id!"})

        if(service === 'favourites') {
            if(!user[service].includes(productId)) return res.status(404).json({message:`This user does not have ${service} product with this id!`});
            if(user[service].includes(productId)) {
            const index = user[service].indexOf(productId);
            user[service].splice(index,1);
            }
        }

        if(service === 'cart'){
            for(const orderDetails of user[service]){
                if(String(orderDetails._id).includes(productId) && orderDetails.size === size){
                    const foundElementIndex = user[service].indexOf(orderDetails);
                    user[service].splice(foundElementIndex,1)
                }
            }
        }

        const dbResponse = await userServices.findByIdAndUpdate(user,profileId);
        const updatedUser = await userServices.findByIdPopulated(profileId);
        updatedUser.password = null
        if(!updatedUser) return res.status(400).json({message: "There is no user with this id!"});

        res.status(200).json({message:`Successfully removed this product to ${service}.`, user:updatedUser});
    } catch(err){
        console.log(err);
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."});
    }
};

const getHandler = async(req,res) => {
    console.log(`POST ${req.originalUrl}`);
    const {profileId} = req.body;

    try {
        const user = await userServices.findByIdPopulated(profileId);
        if(!user) return res.status(400).json({message: "There is no user with this id!"});
        res.status(200).json(user)
    }catch(err) {
        console.log(err);
        if(err.path === '_id') return res.status(400).json({message: "One or all of the id's you provided are not in valid format."});
    }
};


const addFavouriteHandler = addHandler.bind(null,"favourites");
const addCartHandler = addHandler.bind(null,"cart");

const removeFavouriteHandler = removeHandler.bind(null,"favourites")
const removeCartHandler = removeHandler.bind(null,"cart")




router.get('/favourites-get', getHandler)
router.post('/:productId/favourites-add', isLoggedIn, addFavouriteHandler)
router.delete('/:productId/favourites-remove', isLoggedIn, removeFavouriteHandler)

router.get('/cart-get', getHandler)
router.post('/:productId/cart-add', isLoggedIn, addCartHandler)
router.delete('/:productId/cart-remove', isLoggedIn, removeCartHandler)



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