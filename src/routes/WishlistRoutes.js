const routes = require('express').Router();
const WishlistController = require('../controllers/WishlistController');

routes.post('/addWishlist', WishlistController.addWishlist);
routes.get('/getWishlist', WishlistController.getWishlist);
routes.get('/getWishlistByUserId/:userId', WishlistController.getWishlistByUserId)
routes.delete('/removeWishlistByUserId/:userId/:productId', WishlistController.removeWishlistByUserId)
routes.post('/addWishlistByUserId', WishlistController.addWishlistByUserId)

module.exports = routes;