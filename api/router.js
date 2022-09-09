const router = require('express').Router();

const isAdmin = require('./middlewares/isAdmin')
const userController = require('./controllers/userControllers')
const adminController = require('./controllers/adminController')
const productsController = require('./controllers/productsController')

router.use('/users',userController)
router.use('/admin',isAdmin,adminController)
router.use('/products',productsController)


router.all('*', (req,res) => {
    res.status(404).json({error:'This service does not exist!'})
})


module.exports = router;