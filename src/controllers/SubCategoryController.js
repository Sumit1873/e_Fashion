const subcategoryModel = require('../models/SubCategoryModel');

const addSubCategory = async (req, res) => {
    try {
        const savedSubCategory = await subcategoryModel.create(req.body);
        res.status(201).json({
            message: "SubCategory created successfully",
            data: savedSubCategory,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const getAllSubCategory = async (req, res) => {
    const allSubCategory = await subcategoryModel.find().populate("categoryId");
    res.status(200).send({
        message: "all SubCategory",
        data: allSubCategory
    })
}



module.exports = {
    addSubCategory,
    getAllSubCategory
}