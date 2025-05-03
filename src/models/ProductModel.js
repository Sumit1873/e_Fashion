const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    subcategoryId:{
        type: Schema.Types.ObjectId,
        ref: 'subcategories'
    },
    basePrice: {
        type: Number,
        required: true
    },
    offerPrice: {
        type: Number,
        required: true
    },
    offerPercentage: {
        type: Number,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    productImageUrl1: {
        type: String,
        required: true
    },
    productImageUrl2: {
        type: String,
        required: true
    },
    productImageUrl3: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
       
    }
},{
    timestamps: true
});

module.exports = mongoose.model('products', ProductSchema);