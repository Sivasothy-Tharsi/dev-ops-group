// productController.js
const createHttpError = require('http-errors');
const ProductModel = require('../model/product');

exports.savedetails = async (req, res, next) => {
    const { productId,name, category, price, image, description } = req.body;

    try {
        if (!productId || !name || !category || !price || !image || !description) {
            throw createHttpError(400, 'Missing required parameters');
        }

        const newProduct = new ProductModel({
            productId: productId,
            name:  name,
            category: category,
            price: price,
            image: image,
            description: description,
        });

        const result = await newProduct.save();
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
};


exports.getAll = async (req, res, next) => {

    try {
        const result = await ProductModel.find().exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}
