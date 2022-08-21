const router = require('express').Router();

const userController = require('./controllers/userControllers')

router.use('/users',userController)
router.all('*', (req,res) => {
    res.send('Error')
    res.end();
})


module.exports = router;