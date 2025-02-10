const express = require('express');
const Router = express.Router();
const {categoryValidator} = require('../Helpers/Validators');
const {TokenCheck}  = require('../Middlewares/TokenCheck')

const {AddCategory, GetAllCategories, GetCategoryById, UpdateCategoryById, DeleteCategoryById} = require('../Controllers/CategoryController')

Router.post('/',TokenCheck,categoryValidator,AddCategory);
Router.get('/',GetAllCategories);
Router.get('/:id',GetCategoryById);
Router.put('/:id',TokenCheck,categoryValidator,UpdateCategoryById);
Router.delete('/:id',TokenCheck,DeleteCategoryById);


module.exports = Router;
