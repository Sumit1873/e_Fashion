const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('wishlist', WishlistSchema);