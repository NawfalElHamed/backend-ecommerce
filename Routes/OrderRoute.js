const express = require('express');
const Router = express.Router();
const { TokenCheck } = require('../Middlewares/TokenCheck')

const { AddOrder, GetAllOrders, GetOrderById, UpdateOrderById } = require('../Controllers/OrderController')

Router.post('/', TokenCheck, AddOrder);
Router.get('/', TokenCheck, GetAllOrders);
Router.get('/:id', TokenCheck, GetOrderById);
Router.put('/:id', TokenCheck, UpdateOrderById);


module.exports = Router