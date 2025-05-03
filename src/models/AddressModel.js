const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title:{
        enum: ["home", "office", "other"],
        type: String,
        required: true
    },
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
} ,{
    timestamps: true
});

module.exports = mongoose.model("address", addressSchema);