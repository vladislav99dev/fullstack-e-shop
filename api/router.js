const router = require('express').Router();

const userController = require('./controllers/userControllers')

router.use('/users',userController)
router.all('*', (req,res) => {
    res.status(404).json({error:'This service does not exist!'})
})


module.exports = router;