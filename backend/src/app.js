require('dotenv').config()
const mongoose = require('mongoose')
const createHttpError = require('http-errors')
const bcrypt = require ('bcrypt')
const UserModel = require('./model/user')
const UserRouter = require('./routes/user')
const CartRouter = require('./routes/cart')
const ProductRouter = require('./routes/product')
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/carts', CartRouter);


module.exports = app;