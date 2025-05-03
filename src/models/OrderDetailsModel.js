const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailsSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('orderdetails', OrderDetailsSchema);