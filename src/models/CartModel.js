const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref: "products"
    },
    quantity:{
        type: Number,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("carts", cartSchema);