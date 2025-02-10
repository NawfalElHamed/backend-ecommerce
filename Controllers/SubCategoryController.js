const {SubCategoryService} = require('../Services/SubCategoryService');
const {SubCategoryRepository} = require('../Repository/SubCategoryRepository');
const subCategorySchema = require('../Models/SubCategorySchema')

const subCategoryRepo =  new SubCategoryRepository(subCategorySchema)

const subCategoryServ = new SubCategoryService(subCategoryRepo)

exports.AddSubCategory = async (req, res) => {
    const subCategorie = await subCategoryServ.AddSubCategory(req)
    res.json(subCategorie)
}

exports.GetAllSubCategories = async (req, res) => {
    const subCategories = await subCategoryServ.GetAllSubCategories(req)
    res.json(subCategories)
}

exports.GetSubCategoryById = async (req, res) => {
    const subCategories = await subCategoryServ.GetSubCategoryById(req)
    res.json(subCategories)
}

exports.UpdateSubCategoryById = async (req, res) => {
    const subCategories = await subCategoryServ.UpdateSubCategoryById(req)
    res.json(subCategories)
}

exports.DeleteSubCategoryById = async (req, res) => {
    const subCategories = await subCategoryServ.DeleteSubCategoryById(req)
    res.json(subCategories)
}