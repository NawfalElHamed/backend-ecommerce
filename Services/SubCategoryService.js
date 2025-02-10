const CONSTANTS = require('../Config/Constants')
const { sendResponse } = require('../Helpers/sendResponse')
const xss = require('xss');

class SubCategoryService {
    constructor(subCategoryRepo) {
        this.subCategoryRepo = subCategoryRepo;
    }

    async AddSubCategory(req) {
        // Get the user's role from the request
        const role = req.user.role;

        // Extract subcategory and category ID data from the request
        const { subcategory_name, category_id } = req.body;

        // Apply XSS (Cross-Site Scripting) sanitization to subcategory and category ID data
        const sanitizedSubcategoryName = xss(subcategory_name);
        const sanitizedCategoryId = xss(category_id);

        // Create a new subcategory object with the sanitized data
        const newSubCategory = {
            subcategory_name: sanitizedSubcategoryName,
            category_id: sanitizedCategoryId
        };

        try {
            // Check if the user's role is not 'customer'
            if (role !== 'customer') {
                // Add the new subcategory using a 'subCategoryRepo' repository
                await this.subCategoryRepo.AddSubCategory(newSubCategory);

                // Return a response indicating successful subcategory creation
                return sendResponse(CONSTANTS.SUBCATEGORY_CREATION_OK, CONSTANTS.SERVER_CREATED_HTTP_CODE);
            }

            // If the user's role is 'customer', return a response indicating insufficient privilege
            return sendResponse(CONSTANTS.INSUFFICIENT_PRIVILEGE, CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE);
        } catch (error) {
            // In case of an error, check the error code
            if (error.code === 11000) {
                // If the error is due to a duplicate key (code 11000), return a response indicating that the subcategory already exists
                return sendResponse(CONSTANTS.SUBCATEGORY_ALREADY_EXISTS, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
            }

            // If the error is not due to a duplicate key, return a generic response with the error message
            return sendResponse(CONSTANTS.SERVER_ERROR_MESSAGE, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE, error.message);
        }
    }


    async GetAllSubCategories(req) {
        // Get query parameters from the request
        const queryParams = req.query;

        // Define parameters for the subcategory query, including query string, page number, and sorting order
        const params = {
            query: queryParams.query, // The search query
            page: queryParams.page ? Math.max(queryParams.page, 1) : 1, // The page number, default to 1 if not provided or if it's less than 1
            sort: queryParams.sort || "ASC" // The sorting order, default to "ASC" if not provided
        };

        try {
            // Attempt to fetch subcategories using the 'subCategoryRepo' based on the provided parameters
            const subCategories = await this.subCategoryRepo.GetAllSubCategories(params);

            // Check if one or more subcategories were found during the search
            if (subCategories.length === 0) {
                // If no subcategories were found, return a response indicating that no subcategories were found
                return sendResponse(CONSTANTS.SUBCATEGORIES_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE);
            }

            // Return a response indicating that subcategories were found, along with the found subcategories
            return sendResponse(CONSTANTS.SUBCATEGORIES_FOUND, CONSTANTS.SERVER_OK_HTTP_CODE, subCategories);
        } catch (error) {
            // If an error occurs during the process, return a response indicating that no subcategories were found, along with the error message
            return sendResponse(CONSTANTS.SUBCATEGORIES_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, error.message);
        }
    }

    async GetSubCategoryById(req) {
        // Extract the 'id' parameter from the request's parameters.
        const idSubCategory = req.params.id;

        try {
            // Attempt to retrieve a sub-category by its ID using the 'GetSubCategoryById' method.
            const subCategory = await this.subCategoryRepo.GetSubCategoryById(idSubCategory);

            // If the sub-category is found, return a success response with the sub-category data.
            return sendResponse(CONSTANTS.SUBCATEGORY_FOUND, CONSTANTS.SERVER_OK_HTTP_CODE, subCategory);

        } catch (error) {
            // If there's an error during the retrieval, return a not-found response with an error message.
            return sendResponse(CONSTANTS.SUBCATEGORY_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, error.message);
        }
    }

    async UpdateSubCategoryById(req) {
        // Extract parameters and data from the request.
        const idSubCategory = req.params.id; // ID of the sub-category to update.
        const role = req.user.role; // User's role.
        const newDataSubCategory = req.body; // New data for the sub-category.

        // Apply XSS (cross-site scripting) protection to the 'subcategory_name' field to prevent potential security vulnerabilities.
        newDataSubCategory.subcategory_name = xss(newDataSubCategory.subcategory_name);

        try {
            // Check the user's role. If it's not 'customer', proceed with the update.
            if (role !== 'customer') {
                // Update the sub-category using the 'UpdateSubCategoryById' method.
                await this.subCategoryRepo.UpdateSubCategoryById(idSubCategory, newDataSubCategory);
                // Return a success response with a message and a 200 OK HTTP status code.
                return sendResponse(CONSTANTS.SUBCATEGORY_UPDATE_OK, CONSTANTS.SERVER_OK_HTTP_CODE);
            }

            // If the user's role is 'customer', return an insufficient privilege response with a 401 Unauthorized HTTP status code.
            return sendResponse(CONSTANTS.INSUFFICIENT_PRIVILEGE, CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE);

        } catch (error) {
            // Check for specific error codes.

            // If the error code is 11000 (likely a duplicate key error), return a response indicating that the sub-category already exists with a 400 Bad Request HTTP status code.
            if (error.code === 11000) {
                return sendResponse(CONSTANTS.SUBCATEGORY_ALREADY_EXISTS, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
            }

            // For other errors, return a not-found response with an error message and a 404 Not Found HTTP status code.
            return sendResponse(CONSTANTS.SUBCATEGORY_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, error.message);
        }
    }

    async DeleteSubCategoryById(req) {
        // Extract parameters from the request.
        const idSubCategory = req.params.id; // ID of the sub-category to delete.
        const role = req.user.role; // User's role.

        try {
            // Check the user's role. If it's not 'customer', proceed with the deletion.
            if (role !== 'customer') {
                // Attempt to delete the sub-category using the 'DeleteSubCategoryById' method.
                const subCategory = await this.subCategoryRepo.DeleteSubCategoryById(idSubCategory);

                // Check if the sub-category was not found and return a not-found response with an error message.
                if (!subCategory) {
                    return sendResponse(CONSTANTS.SUBCATEGORY_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, error.message);
                }

                // If the deletion was successful, return a success response with a message and a 200 OK HTTP status code.
                return sendResponse(CONSTANTS.SUBCATEGORY_DELETED, CONSTANTS.SERVER_OK_HTTP_CODE);
            }

            // If the user's role is 'customer', return an insufficient privilege response with a 401 Unauthorized HTTP status code.
            return sendResponse(CONSTANTS.INSUFFICIENT_PRIVILEGE, CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE);

        } catch (error) {
            // If there's an error during the deletion, return a not-found response with an error message and a 404 Not Found HTTP status code.
            return sendResponse(CONSTANTS.SUBCATEGORY_NOT_FOUND, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, error.message);
        }
    }




}

module.exports = { SubCategoryService };