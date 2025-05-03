const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    reviewText:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('reviews', ReviewsSchema);