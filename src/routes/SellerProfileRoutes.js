const router = require('express').Router();
const sellerProfileController = require('../controllers/SellerProfileController');

router.post('/add', sellerProfileController.addsellerProfile);
router.get('/allsellerprofile', sellerProfileController.getAllSellerProfile);

module.exports = router;