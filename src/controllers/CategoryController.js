const categoryModel = require('../models/CategoryModel');

const addCategory = async (req, res) => {
    try {
        const savedCategory = await categoryModel.create(req.body);
        res.status(201).json({
            message: "Category created successfully",
            data: savedCategory,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const getAllCategory = async (req, res) => {
    const allCategory = await categoryModel.find();
    res.status(200).send({
        message: "all Category",
        data: allCategory
    })
}


module.exports = {
    addCategory,
    getAllCategory,
   
}