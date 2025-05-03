const orderdetailsModel = require('../models/OrderDetailsModel');

const addOrderDetails = async (req, res) => {
    try{
        const savedOrderDetails = await orderdetailsModel.create(req.body);
        res.status(201).json({
            message: "Order Details created",
            data: savedOrderDetails
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message
        });
    }
}

const getOrderDetails = async (req, res) => {
    const allOrderDetails = await orderdetailsModel.find().populate("orderId").populate("productId");
    res.status(200).send({
        message: "All Order Details",
        data: allOrderDetails
    })
}

const getAllOrderDetailsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const userOrders = await orderdetailsModel
            .find()
            .populate({
                path: "orderId",
                match: { userId: userId }, // Filter orders by userId
                populate: {
                    path: "userId",
                    select: "status totalAmount"
                }
            })
            .populate("productId");

        // Filter out null results (where orderId didn't match)
        const filteredOrders = userOrders.filter(order => order.orderId !== null);

        res.status(200).json({
            message: "Order Details for User",
            data: filteredOrders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message
        });
    }
}

module.exports = {
    addOrderDetails,
    getOrderDetails,
    getAllOrderDetailsByUserId
}