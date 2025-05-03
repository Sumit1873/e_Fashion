const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: "categories"
    },
    name:{
        type: String,
        required: true,
        
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("subcategories", subCategorySchema);