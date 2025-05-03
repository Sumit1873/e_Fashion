const routes = require('express').Router();
const productController = require('../controllers/ProductControllers');


routes.post('/addProduct', productController.addProduct);
routes.get('/getAllProduct', productController.getAllProduct);
routes.post('/addProductWithFile', productController.addProductWithFile);
routes.get('/getAllProductByUserId/:userId', productController.getAllProductByUserId)
routes.get("/getProductById/:id", productController.getProductById);
routes.get('/category/:categoryId', productController.getProductsByCategoryId);
routes.get('/totalProductCount', productController.getTotalProductCount);
routes.put('/update/:id', productController.updateProduct);
routes.delete('/delete/:id', productController.deleteProduct);
routes.get("/countproducts/:userId", productController.getTotalProductCountByUser);

module.exports = routes;