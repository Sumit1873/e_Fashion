const routes    = require('express').Router();
const reviewsController = require('../controllers/ReviewsControllers');

routes.post('/add', reviewsController.addReview);
routes.get('/all', reviewsController.getReviews);

module.exports = routes;