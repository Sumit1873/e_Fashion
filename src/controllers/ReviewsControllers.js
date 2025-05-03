const reviewsModel = require('../models/ReviewsModel');

const addReview = async (req, res) => {
    try{
        const savedReview = await reviewsModel.create(req.body);
        res.status(201).json({
            message: 'Review added successfully',
            review: savedReview
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

const getReviews = async (req, res) => {
    const allReviews = await reviewsModel.find().populate('userId').populate('productId');
    res.status(200).send({
        message: 'All Reviews',
        reviews: allReviews
    });
}

module.exports = {
    addReview,
    getReviews
}