const orderModel = require('../models/OrderModel');
const productModel = require('../models/ProductModel');
const userModel = require('../models/UserModel');

const addOrder = async (req, res) => {
    try {
        const savedOrder = await orderModel.create(req.body);
        res.status(201).json({
            message: "Order created",
            data: savedOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message
        });
    }
};

// Get all orders with user (buyer) and seller info
const getOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find()
            .populate("userId", "firstName email") // buyer
            .populate({
                path: "productId",
                populate: {
                    path: "userId", // seller
                    model: "users",
                    select: "firstName email"
                }
            });

        res.status(200).send({
            message: "All Orders with buyer and seller info",
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching orders",
            error: err.message
        });
    }
};

const getAllOrdersByUserId = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ userId: req.params.userId })
            .populate({
                path: "userId", // buyer
                populate: {
                    model: "users",
                    select: "firstName email"
                }
            });
        res.status(200).send({
            message: "Orders by User",
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'delivered', 'cancel'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            data: updatedOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error updating order status",
            data: err.message
        });
    }
};

// Get total order count for a seller (via product userId)
const getTotalOrderCountByUser = async (req, res) => {
    try {
        const sellerId = req.params.userId;

        // Find product IDs created by this seller
        const sellerProducts = await productModel.find({ userId: sellerId }, '_id');
        const productIds = sellerProducts.map(p => p._id);

        // Count orders for those products
        const orderCount = await orderModel.countDocuments({ productId: { $in: productIds } });

        res.status(200).json({
            message: "Total number of orders for seller",
            total: orderCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to get order count",
            error: err.message
        });
    }
};

module.exports = {
    addOrder,
    getOrders,
    getAllOrdersByUserId,
    updateOrderStatus,
    getTotalOrderCountByUser
};
