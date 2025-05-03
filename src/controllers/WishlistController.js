const wishlistModel = require('../models/WishlistModel');

const addWishlist = async (req, res) => {
    try{
        const savedWishlist = await wishlistModel.create(req.body);
        res.status(201).json({
            message: 'Wishlist added successfully',
            data: savedWishlist
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: 'Error',
            data: err.message
        });
    }
}

const getWishlist = async (req, res) => {
    const allWishlist = await wishlistModel.find().populate('userId').populate('productId');
    res.status(200).send({
        message: 'All Wishlist',
        data: allWishlist
    });
}

const getWishlistByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const userWishlist = await wishlistModel.find({ userId }).populate('productId');

        if (!userWishlist.length) {
            return res.status(404).json({ message: 'No wishlist found for this user' });
        }

        res.status(200).json({
            message: 'User Wishlist',
            data: userWishlist
        });
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user wishlist', data: err.message });
    }
};

// Remove item from wishlist
const removeWishlistByUserId = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const deletedWishlistItem = await wishlistModel.findOneAndDelete({ userId, productId });

        if (!deletedWishlistItem) {
            return res.status(404).json({ message: 'Product not found in wishlist for this user' });
        }

        res.status(200).json({
            message: 'Product removed from wishlist',
            data: deletedWishlistItem
        });
    } catch (err) {
        res.status(500).json({ message: 'Error removing product from wishlist', data: err.message });
    }
};

const addWishlistByUserId = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'User ID and Product ID are required' });
        }

        // Check if product is already in wishlist
        const existingWishlist = await wishlistModel.findOne({ userId, productId });
        if (existingWishlist) {
            return res.status(409).json({ message: 'Product is already in wishlist' });
        }

        const newWishlistItem = await wishlistModel.create({ userId, productId });

        res.status(201).json({
            message: 'Product added to wishlist',
            data: newWishlistItem
        });
    } catch (err) {
        res.status(500).json({ message: 'Error adding product to wishlist', data: err.message });
    }
};


module.exports = {
    addWishlist,
    getWishlist,
    getWishlistByUserId,
    removeWishlistByUserId,
    addWishlistByUserId
}