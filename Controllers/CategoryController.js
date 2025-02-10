const {CategoryService} = require('../Services/CategoryService');
const {CategoryRepository} = require('../Repository/CategoryRepository');
const {SubCategoryRepository} = require('../Repository/SubCategoryRepository');
const categorySchema = require('../Models/CategorySchema')
const subCategorySchema = require('../Models/SubCategorySchema')

const categoryRepo =  new CategoryRepository(categorySchema)
const subCategoryRepo =  new SubCategoryRepository(subCategorySchema)

const categoryServ = new CategoryService(categoryRepo,subCategoryRepo)

exports.AddCategory = async (req, res) => {
    const category = await categoryServ.AddCategory(req)
    res.json(category)
}

exports.GetAllCategories = async (req, res) => {
    const category = await categoryServ.GetAllCategories(req)
    res.json(category)
}

exports.GetCategoryById = async (req, res) => {
    const category = await categoryServ.GetCategoryById(req)
    res.json(category)
}

exports.UpdateCategoryById = async (req, res) => {
    const category = await categoryServ.UpdateCategoryById(req)
    res.json(category)
}

exports.DeleteCategoryById = async (req, res) => {
    const categorie = await categoryServ.DeleteCategoryById(req)
    res.json(categorie)
}