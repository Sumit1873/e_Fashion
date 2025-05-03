const routes = require('express').Router();
const categoryController = require('../controllers/CategoryController');

routes.post('/add', categoryController.addCategory);
routes.get('/allcategories', categoryController.getAllCategory);


module.exports = routes;