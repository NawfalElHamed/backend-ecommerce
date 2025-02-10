const mongoose = require('mongoose');

const orderStatuses = ['open', 'shipped', 'paid', 'closed', 'delivered', 'canceled']
// require('./ProductSchema');

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // reference to 'Users'
        required: true
    },

    order_items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' // reference to 'Product'
        },
        quantity: Number,
    }],

    order_date: {
        type: Date,
        default: Date.now
    },
    cart_total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: orderStatuses,
        default: 'open'
    }


}, { timestamps: true, versionKey: false })



module.exports = mongoose.model('Orders', orderSchema)