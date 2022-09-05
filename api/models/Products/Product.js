const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    type:{
        required:[true,'Type is required'],
        type: String
    },
    category:{
        required:[true,'Type is required'],
        type:String,
    },
    gender:{
        required:[true, 'Gender is required'],
        type:String, 
    },
    brand:{
        required:[true,'Shoe brand is required'],
        type:String,
    },
    imageUrl:{
        required:[true,'Image  is required'],
        type:String,
    },
    color:{
        required:[true,'Shoe color is required'],
        type:String,
    },
    price:{
        required:[true,'Shoe price is required'],
        type:Number,
    },
    sizes:{
        
    },
    onSale:{
        type:Boolean,
        default: false
    }
})


const Product = mongoose.model("Product", productsSchema);

module.exports = Product;