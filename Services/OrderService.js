const CONSTANTS = require('../Config/Constants')
const { sendResponse } = require('../Helpers/sendResponse')

class OrderService {
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }


    async AddOrder(req) {
        const role = req.user.role;
        // Extracting properties role, cart_total_price, and order_items from the request body (req.body).
        const { cart_total_price, order_items } = req.body

        // Creating a new object newOrder with the necessary information to create an order.
        const newOrder = {
            customer_id: req.user.userId,
            order_items,
            cart_total_price,
        };


        try {

            // Checking the user's role. If it's a customer, add the order to the database.
            if (role == 'customer') {
                await this.orderRepo.AddOrder(newOrder);
                // Return a response indicating that the order was successfully created.
                return sendResponse(CONSTANTS.ORDER_CREATION_OK, CONSTANTS.SERVER_CREATED_HTTP_CODE);
            }

            // If the user is not a customer, return a response indicating insufficient privileges.
            return sendResponse(CONSTANTS.SERVER_CREATED_HTTP_CODE, CONSTANTS.INSUFFICIENT_PRIVILEGE);

        } catch (error) {
            // In case of an error during the process, return a response with an error code and error message.
            return sendResponse(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE, CONSTANTS.SERVER_ERROR_MESSAGE, error.message);
        }

    }

    async GetAllOrders(req) {

        const role = req.user.role;
        // Extracting query parameters and user role from the request.
        const queryParams = req.query

        // Creating a params object with query, page, and sort properties based on request parameters.
        const params = {
            query: queryParams.query,
            page: queryParams.page ? Math.max(queryParams.page, 1) : 1,
            sort: queryParams.sort || "ASC"
        };


        try {
            // Allowing access only if the user role is not 'customer'.
            if (role !== 'customer') {
                // Fetching orders from the repository based on the specified parameters.
                const orders = await this.orderRepo.GetAllOrders(params);

                // Checking if any orders were found.
                if (orders.length === 0) {
                    // If no orders are found, return a response indicating not found.
                    return sendResponse(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, CONSTANTS.ORDERS_NOT_FOUND);
                } else {
                    // If orders are found, return a response indicating success and include the orders.
                    return sendResponse(CONSTANTS.SERVER_OK_HTTP_CODE, CONSTANTS.ORDERS_FOUND, orders);
                }
            }
            // If the user is a customer, return a response indicating insufficient privilege.
            return sendResponse(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE, CONSTANTS.INSUFFICIENT_PRIVILEGE);

        } catch (error) {
            // In case of an error during the process, return a response with an error code and error message.
            return sendResponse(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE, CONSTANTS.SERVER_ERROR_MESSAGE, error.message);
        }

    }

    async GetOrderById(req) {
        const role = req.user.role;
        // Extracting user role and order ID from the request
        const idOrder = req.params.id
        try {
            // Checking if the user role is not 'customer'
            if (role !== 'customer') {
                // Fetching the order details using the GetOrderById method from the repository
                const order = await this.orderRepo.GetOrderById(idOrder)
                // Returning a successful response with the order details
                return sendResponse(CONSTANTS.SERVER_OK_HTTP_CODE, CONSTANTS.ORDER_FOUND, order);
            }
            // Returning a response indicating insufficient privilege if the user is a customer
            return sendResponse(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE, CONSTANTS.INSUFFICIENT_PRIVILEGE);


        } catch (error) {
            // Handling errors and returning a response with an error code and message
            return sendResponse(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE, CONSTANTS.SERVER_ERROR_MESSAGE, error.message);
        }

    }

    async UpdateOrderById(req) {
        // Extracting user role, order ID, and new order status from the request
        const role = req.user.role
        const idOrder = req.params.id
        const newOrderStatus = req.body
        try {
            // Checking if the user role is not 'customer'
            if (role !== 'customer') {
                // Updating the order status using the UpdateOrderById method from the repository
                await this.orderRepo.UpdateOrderById(idOrder, newOrderStatus)
                // Returning a successful response after updating the order status
                return sendResponse(CONSTANTS.ORDER_UPDATE_OK, CONSTANTS.SERVER_OK_HTTP_CODE);
            }
            // Returning a response indicating insufficient privilege if the user is a customer
            return sendResponse(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE, CONSTANTS.INSUFFICIENT_PRIVILEGE);
        } catch (error) {
            // Handling errors and returning a response with an error code and message
            return sendResponse(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE, CONSTANTS.SERVER_ERROR_MESSAGE, error.message);
        }
    }



}


module.exports = { OrderService }