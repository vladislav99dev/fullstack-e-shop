const router = require('express').Router();

const productHandler = (req,res) => {
    console.log(`POST ${req.originalUrl}`);
    console.log(req.isAdmin)

    res.end();
}


router.post('/products/create', productHandler)



module.exports = router;