const { OrderService } = require('../Services/OrderService');
const { OrderRepository } = require('../Repository/OrderRepository');
const orderSchema = require('../Models/OrderSchema')

const orderRepo = new OrderRepository(orderSchema)

const orderServ = new OrderService(orderRepo)

exports.AddOrder = async (req, res) => {
    const order = await orderServ.AddOrder(req)
    res.json(order)
}

exports.GetAllOrders = async (req, res) => {
    const orders = await orderServ.GetAllOrders(req)
    res.json(orders)
}

exports.GetOrderById = async (req, res) => {
    const order = await orderServ.GetOrderById(req)
    res.json(order)
}

exports.UpdateOrderById = async (req, res) => {
    const order = await orderServ.UpdateOrderById(req)
    res.json(order)
}