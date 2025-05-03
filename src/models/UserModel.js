const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        
    },
    lastName: {
        type: String,
        required: true,
    
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: "roles",

    },
    status: {
        type: Boolean,
        default: true
    },
    loginHistory: [
        {
            type: Date
        }
    ],
},{
    timestamps: true
});

module.exports = mongoose.model("users", userSchema);
