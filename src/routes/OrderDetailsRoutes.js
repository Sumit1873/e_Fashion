const routes = require('express').Router(); 
const orderdetailsController = require('../controllers/OrderDetailsController');

routes.post('/addOrderDetails', orderdetailsController.addOrderDetails);
routes.get('/getOrderDetails', orderdetailsController.getOrderDetails);
routes.get('/getAllOrderDetailsByUserId/:userId', orderdetailsController.getAllOrderDetailsByUserId)

module.exports = routes;
