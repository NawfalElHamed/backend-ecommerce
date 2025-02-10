const CONSTANTS = require('../Config/Constants')
const { sendResponse } = require('../Helpers/sendResponse')
const { addImages } = require('../Helpers/azur')

class ProductService {
    constructor(ProductRepo) {
        this.ProductRepo = ProductRepo;
    }

    // Create a new product based on the request data
    async Create(req) {
        try {
            // Check if req.files is empty
            if (!req.files || req.files.length === 0) {
                // Return an error response indicating that no files were uploaded
                return sendResponse(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE, CONSTANTS.EMPTY_FILES);
            }

            // The rest of your code here...
            const { sku, product_name, short_description, long_description, price, quantity, discount_price, options, subcategory_id } = req.body;
            const role = req.user.role;
            const images = req.files;
            const product_image = await addImages(images);

            if (role !== 'customer') {
                // Create a NewProduct object
                const NewProduct = {
                    sku,
                    product_image: product_image,
                    product_name,
                    subcategory_id,
                    short_description,
                    long_description,
                    price,
                    quantity,
                    discount_price,
                    options
                };
                // Call the Create method of ProductRepo to add the product to the database
                await this.ProductRepo.Create(NewProduct);

                // Return a success response
                return sendResponse(CONSTANTS.SERVER_OK_HTTP_CODE, CONSTANTS.PRODUCT_CREATION_OK);
            } else {
                // Return an unauthorized access response
                return sendResponse(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE, CONSTANTS.INSUFFICIENT_PRIVILEGE);
            }
        } catch (error) {
            if (error.code === 11000) {
                // Handle the error for duplicate key (E11000)
                return sendResponse(CONSTANTS.PRODUCT_ALREADY_EXISTS, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
            } else {
                // Handle other errors
                console.error('An error occurred:', error.message);
                throw error;
            }
        }
    }


    // Retrieve a list of products based on query parameters
    async getAllProducts(req) {
        const queryParams = req.query

        try {
            // Call the getAllProducts method of ProductRepo to retrieve products
            const products = await this.ProductRepo.getAllProducts(queryParams);

            // Check if products were found
            if (products.length === 0) {
                return sendResponse(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, CONSTANTS.PRODUCTS_NOT_FOUND);
            } else {
                return sendResponse(CONSTANTS.SERVER_OK_HTTP_CODE, products);
            }
        } catch (error) {
            return error.message;
        }

    }

    // Retrieve a product by its ID

    async GetProductById(req) {
        const productId = req.params.id

        try {
            const product = await this.ProductRepo.GetProductById(productId)
            return sendResponse(CONSTANTS.SERVER_OK_HTTP_CODE, product);



        } catch (error) {
            return sendResponse(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, CONSTANTS.PRODUCTS_NOT_FOUND);

        }
    }

    async UpdateProductById(req) {
        const productId = req.params.id
        const role = req.user.role;
        const newDataProduct = req.body
        try {
            if (role !== 'customer') {
                await this.ProductRepo.UpdateProductById(productId, newDataProduct)
                return sendResponse(CONSTANTS.SERVER_OK_HTTP_CODE, CONSTANTS.PRODUCT_UPDATE_OK);

            } else {
                return sendResponse(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE, CONSTANTS.INSUFFICIENT_PRIVILEGE);
            }
        } catch (error) {

            if (error.code === 11000 && error.keyPattern.category_name === 1) {
                // Gérer l'erreur de clé dupliquée
                return sendResponse(CONSTANTS.PRODUCT_UPDATE_FAILED, CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE);
            } else {
                return sendResponse(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, CONSTANTS.PRODUCTS_NOT_FOUND);
            }

        }
    }

    async DeleteProductById(req) {
        const id = req.params.id
        const role = req.user.role
        try {
            if (role !== 'Customer') {
                const deleteProduct = await this.ProductRepo.DeleteProductById(id)
                console.log(deleteProduct);
                if (deleteProduct.deletedCount === 0) {
                    return sendResponse(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, CONSTANTS.PRODUCTS_NOT_FOUND);
                } else {
                    return sendResponse(CONSTANTS.SERVER_OK_HTTP_CODE, CONSTANTS.PRODUCT_DELETED);
                }
            } else {
                return sendResponse(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE, CONSTANTS.INSUFFICIENT_PRIVILEGE);
            }

        } catch (e) {
            return sendResponse(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE, CONSTANTS.PRODUCTS_NOT_FOUND);
        }
    }
}

module.exports = { ProductService };
