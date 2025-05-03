const cartModel = require('../models/CartModel');

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if the product already exists in the cart
        let cartItem = await cartModel.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await cartModel.create({ userId, productId, quantity });
        }

        res.status(201).json({
            message: "Product added to cart",
            data: cartItem,
        });
    } catch (err) {
        console.error("Error adding product to cart:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        const allCart = await cartModel.find().populate("productId", "productName offerPrice productImageUrl1");
        res.status(200).json({ message: "All Cart Items", data: allCart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await cartModel.find({ userId }).populate("productId", "productName offerPrice productImageUrl1");
        res.status(200).json({ message: "User's Cart Items", data: cartItems });
    } catch (error) {
        console.error("Error fetching user's cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteAllCartByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId } = req.query;

        const deletedItem = await cartModel.findOneAndDelete({ userId, productId });

        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteAllCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Delete all cart items for the given userId
        const deletedItems = await cartModel.deleteMany({ userId });

        if (deletedItems.deletedCount === 0) {
            return res.status(404).json({ error: "No cart items found for this user" });
        }

        res.status(200).json({ message: "All cart items removed successfully" });
    } catch (error) {
        console.error("Error deleting all cart items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateCartByUserId = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        const cartItem = await cartModel.findOneAndUpdate(
            { userId, productId },
            { $set: { quantity } },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart item quantity updated", data: cartItem });
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    addToCart,
    getCart,
    getAllCartByUserId,
    deleteAllCartByProductId,
    deleteAllCartByUserId,
    updateCartByUserId
};
