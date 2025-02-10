const CONSTANTS = require('../Config/Constants')
const { sendResponse } = require('../Helpers/sendResponse')
const xss = require('xss');

class CategoryService {
    constructor(categoryRepo,subCategoryRepo) {
        this.categoryRepo = categoryRepo;
        this.subCategoryRepo = subCategoryRepo;
    }


    async AddCategory(req) {
        // Get the user's role from the request
        const role = req.user.role;
    
        // Get the category name from the request body
        const { category_name } = req.body;

        // Sanitize (clean) the category name to prevent XSS attacks
        const sanitizedCategoryName = xss(category_name);

        // Create an object newCategory with the category name
        const newCategory = {
            category_name:sanitizedCategoryName
        };
    
        try {
            // Check if the user's role is not 'customer'
            if (role !== 'customer') {
                // If the role is not 'customer', add the new category
                await this.categoryRepo.AddCategory(newCategory);
                // Return a response indicating that the category has been successfully created
                return sendResponse(CONSTANTS.CATEGORY_CREATION_OK, CONSTANTS.SERVER_CREATED_HTTP_CODE);
            }
            // If the role is 'customer', return a response indicating insufficient privilege
            return sendResponse(CONSTANTS.INSUFFICIENT_PRIVILEGE, CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE);
        } catch (error) {
            if (error.code === 11000) {
                // Handle the duplicate key error (E11000)
                // Return a response indicating that the category already exists
                return sendResponse(CONSTANTS.CATEGORY_ALREADY_EXISTS, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
            }
            // In case of other errors, We simply return the error message from the 'error' object as a response.
            return sendResponse(error.message, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
        }
    }


    async GetAllCategories(req) {

        // Extract query parameters from the request.
        const queryParams = req.query; 
    
        // Prepare parameters for category search.
        const params = {
            query: queryParams.query,
            page: queryParams.page ? Math.max(queryParams.page, 1) : 1,
            sort: queryParams.sort || "ASC",
        };
    
        try {
            // Call the 'GetAllCategories' method of the repository to fetch the list of categories.
            const categories = await this.categoryRepo.GetAllCategories(params);
    
            if (categories.length === 0) {
                // If no category is found, return a "Categories not found" response with an HTTP "Not Found" (404) status code.
                return sendResponse(CONSTANTS.CATEGORIES_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE);
            } 
            
            // Return a "Category found" response with an HTTP "OK" (200) status code and the list of categories.
            return sendResponse(CONSTANTS.CATEGORIES_FOUND, CONSTANTS.SERVER_OK_HTTP_CODE, categories);

        } catch (error) {
            // In case of an error, return a response with the error message and an HTTP "OK" (200) status code.
            return sendResponse(CONSTANTS.CATEGORIES_NOT_FOUND, CONSTANTS.SERVER_OK_HTTP_CODE, error.message);
        }
    }
    
    async GetCategoryById(req) {

        // Extract the category ID from the request parameters.
        const idCategory = req.params.id; 
    
        try {
            // Call the 'GetCategoryById' method of the repository to retrieve a category by its ID.
            const category = await this.categoryRepo.GetCategoryById(idCategory);
            
            // Extract specific properties from the category object.
            const { _id, category_name, active } = category;
    
            // Return a response indicating that the category was found with an HTTP "OK" (200) status code,
            // and include the extracted properties.
            return sendResponse(CONSTANTS.CATEGORY_FOUND, CONSTANTS.SERVER_OK_HTTP_CODE, { _id, category_name, active });
        } catch(error) {
            // In case of an error, return a response indicating that the category was not found with an HTTP "OK" (200) status code,
            // and include the error message.
            return sendResponse(CONSTANTS.CATEGORY_NOT_FOUND, CONSTANTS.SERVER_OK_HTTP_CODE, error.message);
        }
    }

    async UpdateCategoryById(req) {
        const idCategory = req.params.id; // Extract the category ID from the request parameters.
        const role = req.user.role; // Get the user's role from the request.
        const newDataCategory = req.body; // Get the updated category data from the request body.
    
        // Sanitize (clean) the 'category_name' field to prevent XSS attacks
        newDataCategory.category_name = xss(newDataCategory.category_name);
    
        try {
            if (role !== 'customer') {

                // If the user's role is not 'customer', update the category using the repository.
                await this.categoryRepo.UpdateCategoryById(idCategory, newDataCategory);

                // Return a response indicating that the category has been successfully updated with an HTTP "OK" (200) status code.
                return sendResponse(CONSTANTS.CATEGORY_UPDATE_OK, CONSTANTS.SERVER_OK_HTTP_CODE);
            } 

            // If the user's role is 'customer', return a response indicating insufficient privilege with an HTTP "Unauthorized" (401) status code.
            return sendResponse(CONSTANTS.INSUFFICIENT_PRIVILEGE, CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE);

        } catch(error) {
            if (error.code === 11000) {
                
                // Handle the duplicate key error (E11000)
                // Return a response indicating that the category already exists with an HTTP "Bad Request" (400) status code.
                return sendResponse(CONSTANTS.CATEGORY_ALREADY_EXISTS, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
            }

            // In case of other errors, return the error message from the 'error' object as a response with an HTTP "Not Found" (404) status code.
            return sendResponse(CONSTANTS.CATEGORY_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, error.message);
        }
    }

    async DeleteCategoryById(req) {
        // Extract parameters from the request.
        const idCategory = req.params.id; // ID of the category to delete.
        const role = req.user.role; // User's role.
    
        try {
            // Check the user's role. If it's not 'customer', proceed with the deletion.
            if (role !== 'customer') {
                // Get a list of subcategories for the specified category.
                const subcategories = await this.subCategoryRepo.GetSubsOfCategory(idCategory);
    
                // Check if there are subcategories associated with the category.
                if (subcategories.length > 0) {
                    // Return a response indicating that the category has subcategories and cannot be deleted, along with the count of subcategories.
                    return sendResponse(CONSTANTS.CATEGORY_HAS_SUBCATEGORIES, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
                } else {
                    // If there are no subcategories, proceed with deleting the category.
                    const category = await this.categoryRepo.DeleteCategoryById(idCategory);
    
                    // Check if the category was not found and return a not-found response with an error message.
                    if (category.deletedCount === 0) {
                        return sendResponse(CONSTANTS.CATEGORY_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE);
                    }
    
                    // If the deletion was successful, return a success response with a message and a 200 OK HTTP status code.
                    return sendResponse(CONSTANTS.CATEGORY_DELETED, CONSTANTS.SERVER_OK_HTTP_CODE);
                }
            } else {
                // If the user's role is 'customer', return an insufficient privilege response with a 401 Unauthorized HTTP status code.
                return sendResponse(CONSTANTS.INSUFFICIENT_PRIVILEGE, CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE);
            }
        } catch (error) {
            // If there's an error during the deletion, return a not-found response with an error message and a 404 Not Found HTTP status code.
            return sendResponse(CONSTANTS.CATEGORY_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, error.message);
        }
    }
    
    

    

}

module.exports = { CategoryService }