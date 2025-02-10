/* HTTP status code constant starts */
module.exports.SERVER_ERROR_HTTP_CODE = 412;
module.exports.SERVER_NOT_ALLOWED_HTTP_CODE = 503;
module.exports.SERVER_OK_HTTP_CODE = 200;
module.exports.SERVER_CREATED_HTTP_CODE = 201;
module.exports.SERVER_UPDATED_HTTP_CODE = 204;
module.exports.SERVER_NOT_FOUND_HTTP_CODE = 404;
module.exports.SERVER_INTERNAL_ERROR_HTTP_CODE = 500;
module.exports.SERVER_FORBIDDEN_HTTP_CODE = 403;
module.exports.SERVER_BAD_REQUEST_HTTP_CODE = 400;
module.exports.SERVER_UNAUTHORIZED_HTTP_CODE = 401;



/* Route related user constants starts */
module.exports.USER_REGISTRATION_OK = 'User registration successful.';
module.exports.USER_REGISTRATION_FAILED = 'User registration unsuccessful.';
module.exports.USER_LOGIN_OK = 'User logged in.';
module.exports.USER_LOGIN_FAILED = 'User not found.';
module.exports.USER_FOUND = 'Users founds.';
module.exports.USER_CREATED = 'User Created Succefuly.';
module.exports.USER_UPDATED = 'User Updated Succefuly.';
module.exports.USER_DELETED = 'User Deleted Succefuly.';
module.exports.ALREADY_USER_DELETED = 'No User Deleted';
module.exports.INSUFFICIENT_PRIVILEGE = "You don't have enough privilege for this operation.";
module.exports.NOT_AUTHORIZED = 'You are not authorized';
module.exports.WRONG_TOKEN = 'oups verification token is wrong';


module.exports.ADMIN_EXIST = 'admin already exist';





/* Route related customer constants starts */
module.exports.CUSTOMER_REGISTRATION_OK = 'Customer registration successful.';
module.exports.CUSTOMER_REGISTRATION_FAILED = 'Customer registration unsuccessful.';
module.exports.CUSTOMER_LOGIN_OK = 'Customer logged in.';
module.exports.CUSTOMER_NOT_FOUND = 'Customer not found.';
module.exports.CUSTOMERS_NOT_FOUND = 'Customers not found.';
module.exports.CUSTOMER_FOUND = 'Customers founds.';
module.exports.CUSTOMER_CREATED = 'Customer Created Succefuly.';
module.exports.CUSTOMER_UPDATED = 'Customer Updated Succefuly.';
module.exports.CUSTOMER_DELETED = 'Customer Deleted Succefuly.';
module.exports.ALREADY_CUSTOMER_DELETED = 'No Customer Deleted';


/* Category-related constants */
module.exports.CATEGORY_CREATION_OK = 'Category created successfully.';
module.exports.CATEGORY_CREATION_FAILED = 'Category creation failed.';
module.exports.CATEGORY_UPDATE_OK = 'Category updated successfully.';
module.exports.CATEGORY_UPDATE_FAILED = 'Category update failed.';
module.exports.CATEGORY_NOT_FOUND = 'Category not found.';
module.exports.CATEGORIES_NOT_FOUND = 'Categories not found.';
module.exports.CATEGORY_FOUND = 'Category found.';
module.exports.CATEGORIES_FOUND = 'Categories found.';
module.exports.CATEGORY_DELETED = 'Category deleted successfully.';
module.exports.ALREADY_CATEGORY_DELETED = 'Category already deleted.';
module.exports.CATEGORY_ALREADY_EXISTS = 'The category with this name already exists.';
module.exports.CATEGORY_HAS_SUBCATEGORIES = 'The category has subcategories. You cannot delete it.';


/* Subcategory-related constants */
module.exports.SUBCATEGORY_CREATION_OK = 'Subcategory created successfully.';
module.exports.SUBCATEGORY_CREATION_FAILED = 'Subcategory creation failed.';
module.exports.SUBCATEGORY_UPDATE_OK = 'Subcategory updated successfully.';
module.exports.SUBCATEGORY_UPDATE_FAILED = 'Subcategory update failed.';
module.exports.SUBCATEGORY_NOT_FOUND = 'Subcategory not found.';
module.exports.SUBCATEGORIES_NOT_FOUND = 'Subcategories not found.';
module.exports.SUBCATEGORY_FOUND = 'Subcategory found.';
module.exports.SUBCATEGORIES_FOUND = 'Subcategories found.';
module.exports.SUBCATEGORY_DELETED = 'Subcategory deleted successfully.';
module.exports.ALREADY_SUBCATEGORY_DELETED = 'Subcategory already deleted.';
module.exports.SUBCATEGORY_ALREADY_EXISTS = 'The subcategory with this name already exists.';




/* Validation related  constants starts */
module.exports.PASSWORD_NOT_FOUND = 'password can\'t be empty.';
module.exports.USERNAME_NOT_FOUND = 'User name can\'t be empty.';
module.exports.USERLASTNAME_NOT_FOUND = 'User last name can\'t be empty.';
module.exports.EMAIL_NOT_FOUND = 'Email can\'t be empty.';
module.exports.PASSWORD_NOT_FOUND = 'Password can\'t be empty.';
module.exports.USER_NOT_FOUND = 'User does not exits.';
module.exports.LOGIN_ERROR = 'Email or password is incorect';
module.exports.FIELD_EMPTY = 'All fields are required.';



/* Product-related constants */
module.exports.PRODUCT_CREATION_OK = 'Product created successfully.';
module.exports.PRODUCT_CREATION_FAILED = 'Product creation failed.';
module.exports.PRODUCT_UPDATE_OK = 'Product updated successfully.';
module.exports.PRODUCT_UPDATE_FAILED = 'Product update failed.';
module.exports.PRODUCT_NOT_FOUND = 'Product not found.';
module.exports.PRODUCTS_NOT_FOUND = 'Products not found.';
module.exports.PRODUCT_FOUND = 'Product found.';
module.exports.PRODUCT_DELETED = 'Product deleted successfully.';
module.exports.ALREADY_PRODUCT_DELETED = 'Product already deleted.';
module.exports.PRODUCT_ALREADY_EXISTS = 'The product already exists.';


/* Order-related constants */
module.exports.ORDER_CREATION_OK = 'Order created successfully.';
module.exports.ORDER_CREATION_FAILED = 'Order creation failed.';
module.exports.ORDER_UPDATE_OK = 'Order updated successfully.';
module.exports.ORDER_UPDATE_FAILED = 'Order update failed.';
module.exports.ORDER_NOT_FOUND = 'Order not found.';
module.exports.ORDERS_NOT_FOUND = 'Orders not found.';
module.exports.ORDERS_FOUND = 'Orders found.';
module.exports.ORDER_FOUND = 'Order found.';
module.exports.ORDER_DELETED = 'Order deleted successfully.';
module.exports.ALREADY_ORDER_DELETED = 'Order already deleted.';
module.exports.ORDER_ALREADY_EXISTS = 'The order with this ID already exists.';

/* General Errors  constants start */
module.exports.EMPTY_FILES = 'No files uploaded';




/* General Errors  constants start */
module.exports.ROUTE_NOT_FOUND = 'You are at wrong place. Shhoooo...';
module.exports.SERVER_ERROR_MESSAGE = 'Something bad happend. It\'s not you, it\'s me.';