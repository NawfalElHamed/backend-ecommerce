const express = require('express');
const Router = express.Router();
const upload = require('../Middlewares/Multer');

// const upload = require('../Middlewares/Multer')
const { productValidator} = require('../Helpers/Validators');
const {TokenCheck}  = require('../Middlewares/TokenCheck')
const {Create,getAllProducts,GetProductById,UpdateProductById,DeleteProductById} = require('../Controllers/ProductController')

Router.post('/' , TokenCheck ,upload.array('product_image' , 5), Create)
Router.get('/' , getAllProducts)
Router.get('/:id', GetProductById);
Router.put('/:id',TokenCheck,UpdateProductById);
Router.delete('/:id',TokenCheck,DeleteProductById);



module.exports  = Router