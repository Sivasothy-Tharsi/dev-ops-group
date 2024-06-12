const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const authenticateUser = require('../middlewears/verifyToken');

router.use(authenticateUser);

router.post('/add-to-cart', cartController.addToCart);

router.delete('/remove-from-cart/:productId', cartController.removeFromCart);

router.get('/all/', cartController.getAll);
router.delete('/:id', cartController.deleteCart);

router.put('/:id', cartController.editCart);

// router.get('/:id', cartController.getdetailsbyid);
router.get('/total', authenticateUser, cartController.getCartTotal);


module.exports = router;