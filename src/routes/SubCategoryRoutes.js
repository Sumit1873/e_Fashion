const routes = require('express').Router();
const subCategoryController = require('../controllers/SubCategoryController');

routes.post('/add', subCategoryController.addSubCategory);
routes.get('/allsubcategories', subCategoryController.getAllSubCategory);

module.exports = routes;