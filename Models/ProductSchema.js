const mongoose = require('mongoose');

const productSchema =  new mongoose.Schema({
    
        sku:{
            type: String,
            unique: true 
          },

        product_image: [String],

        product_name: 
        {
          type: String,
          unique: true
        },

        subcategory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory',  // Référence au modèle de catégorie
            name : 'SubCategory'
              
          },

        short_description: String,

        long_description: String,

        price: Number,

        quantity :
        {
          type : Number,
          default : 0
        },

        discount_price: Number,

        options: mongoose.Schema.Types.Mixed,

        active: {
          type: Boolean,
          default: false
        }
    },{timestamps:true})

module.exports = mongoose.model('Product', productSchema)