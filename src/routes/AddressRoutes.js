const routes = require('express').Router();
const addressController = require('../controllers/AddressController');

routes.post('/add', addressController.addAddress);
routes.get('/alladdresses', addressController.getAllAddress);
routes.get("/getaddress/:userId", addressController.getUserAddresses);
routes.put("/updateaddress/:userId", addressController.addOrUpdateAddress);


module.exports = routes;