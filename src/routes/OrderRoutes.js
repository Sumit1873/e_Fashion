const routes = require('express').Router();
const orderController = require('../controllers/OrderController');

routes.post('/addOrder', orderController.addOrder);
routes.get('/getOrders', orderController.getOrders);
routes.get('/getAllOrderByUserId/:userId', orderController.getAllOrdersByUserId);
routes.put("/updateStatus/:orderId", orderController.updateOrderStatus);
routes.get("/countorders/:userId", orderController.getTotalOrderCountByUser);



module.exports = routes;