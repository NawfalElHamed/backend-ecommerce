const express = require('express');
const Router = express.Router();
const {subCategoryValidator} = require('../Helpers/Validators');
const {TokenCheck}  = require('../Middlewares/TokenCheck')

const {AddSubCategory, GetAllSubCategories, GetSubCategoryById, UpdateSubCategoryById, DeleteSubCategoryById} = require('../Controllers/SubCategoryController')

Router.post('/',TokenCheck,subCategoryValidator,AddSubCategory);
Router.get('/',GetAllSubCategories);
Router.get('/:id',GetSubCategoryById);
Router.put('/:id',TokenCheck,UpdateSubCategoryById);
Router.delete('/:id',TokenCheck,DeleteSubCategoryById);


module.exports = Router;