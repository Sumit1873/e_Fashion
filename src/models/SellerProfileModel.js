const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerProfileSchema = new Schema({
    
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    businessName:{
        type: String,
        required: true
    },
    businessDescription:{
        type: String,
        required: true
    },
    businessEmail:{
        type: String,
        required: true
    },
    businessPhone:{
        type: String,
        required: true
    },
    address:{
        unitName:{
        type: String,
        required: true
        },
        street:{
            type: String,
            required: true
        },
        landmark:{
            type: String,
            required: true
        },
        stateId: {
            type: Schema.Types.ObjectId,
            ref: "states"
        },
        cityId: {
            type: Schema.Types.ObjectId,
            ref: "cities"
        },
        areaId: {
            type: Schema.Types.ObjectId,
            ref: "areas"
        },
        pincode:{
            type: Number,
            required: true
        }
    },
    websiteUrl:{
        type: String,
        required: true
    },
} ,{
    timestamps: true
});

module.exports = mongoose.model("sellerProfile", sellerProfileSchema);