const mongoose = require('mongoose');

class OrderRepository {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    async AddOrder(order) {
        const { customer_id, order_items, cart_total_price } = order;
        return await this.orderModel.create({
            customer_id, order_items, cart_total_price
        })
    }

    async GetAllOrders(params) {
        // Creating an empty query object for filtering orders.
        const ordersQuery = {};

        // Checking if a search query is provided. If yes, adding a regex search for the 'status' field.
        if (params.query) {
            ordersQuery.$or = [
                { status: { $regex: params.query, $options: 'i' } }
            ];
        }

        // Setting the number of orders to be displayed per page.
        const ORDERS_PER_PAGE = 1;
        // Calculating the number of orders to skip based on the page number.
        const skip = (params.page - 1) * ORDERS_PER_PAGE;

        // Querying the database to fetch orders based on the provided parameters.
        const orders = await this.orderModel
            .find(ordersQuery)
            .populate('customer_id')
            .sort({ createdAt: params.sort === 'DESC' ? -1 : 1 })
            .skip(skip)
            .limit(ORDERS_PER_PAGE);

        // Calculating the total quantity of products ordered for each order.
        const transformedData = orders.map(order => {
            const itemsTotal = order.order_items.reduce((total, item) => total + item.quantity, 0);
            // Transforming order data for response, including relevant information.
            return {
                _id: order._id,
                customer_id: order.customer_id._id,
                customer_first_name: order.customer_id.first_name,
                customer_last_name: order.customer_id.last_name,
                itemsTotal: itemsTotal,
                order_date: new Date(order.order_date).getTime(), // Converting order_date to milliseconds (needed by Ark)
                cart_total_price: order.cart_total_price,
                status: order.status,
            };
        });

        // Returning the transformed data.
        return transformedData;
    }

    async GetOrderById(idOrder) {
        // Fetching the order details from the database and populating customer and product information
        const order = await this.orderModel.findOne({ _id: idOrder })
            .populate('customer_id order_items.product_id');

        // Transforming the order data into a desired format
        const transformedData = {
            _id: order._id,
            customer_id: order.customer_id._id,
            customer_first_name: order.customer_id.first_name,
            customer_last_name: order.customer_id.last_name,
            "orderItems": order.order_items.map(item => ({
                "item_id": item.product_id._id,
                "item_name": item.product_id.product_name,
                "quantity": item.quantity,
                "unit_price": item.product_id.price,
                "total_price": item.quantity * item.product_id.price
            })),
            order_date: new Date(order.order_date).getTime(),
            cart_total_price: order.cart_total_price,
            status: order.status,
        };
        // Returning the transformed order data
        return transformedData
    }

    async UpdateOrderById(idOrder, newOrderStatus) {
        return await this.orderModel.findOneAndUpdate({ _id: idOrder }, { $set: newOrderStatus }, { new: true })
    }

}


module.exports = { OrderRepository };