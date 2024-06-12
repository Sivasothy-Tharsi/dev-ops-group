// productRouter.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');
const verifyToken = require('../middlewears/verifyToken')

router.post('/', ProductController.savedetails);
router.get('/all', ProductController.getAll)

module.exports = router;
