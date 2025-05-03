const sellerprofileModel = require('../models/SellerProfileModel');


const addsellerProfile = async (req, res) => {
    try {
        const savedSellerProfile = await sellerprofileModel.create(req.body);
        res.status(201).json({
            message: "Seller Profile created successfully",
            data: savedSellerProfile,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const getAllSellerProfile = async (req, res) => {
    const allSellerProfile = await sellerprofileModel.find().populate("userId");
    res.status(200).send({
        message: "all Seller Profile",
        data: allSellerProfile
    })
}

module.exports = {
    addsellerProfile,
    getAllSellerProfile
}