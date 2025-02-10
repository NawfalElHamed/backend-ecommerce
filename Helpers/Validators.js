const { body, validationResult } = require('express-validator');
const User = require('../Models/UserSchema');

const registerValidator = [
  body('first_name')
    .isString()
    .notEmpty()
    .withMessage('First name is required'),

  body('last_name')
    .isString()
    .notEmpty()
    .withMessage('Last name is required'),

  body('email')
    .isString()
    .isEmail()
    .withMessage('Valid email is required')
    .custom(async (value) => {
      // Check if the email is already in use
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email is already in use');
      }
      return true;
    }),

  body('user_name')
    .isString()
    .notEmpty()
    .withMessage('Username is required'),

  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('email is required'),

  body('password')
    .notEmpty()
    .withMessage('password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]
  const productValidator = [
    body('sku')
      .isString()
      .notEmpty()
      .withMessage('sku is required'),
  
    body('product_image')
      .isString()
      .notEmpty()
      .withMessage('product image is required'),
  
    // body('product_name')
    //   .isString()
    //   .notEmpty()
    //   .withMessage('product product name is required'),

      
    body('short_description')
    .isString()
    .notEmpty()
    .withMessage('product short description is required'),

    body('long_description')
    .isString()
    .notEmpty()
    .withMessage('product long description is required'),

    body('price')
    .isFloat()
    .notEmpty()
    .withMessage('product price is required'),

    body('subcategory_id')
    .isString()
    .notEmpty()
    .withMessage('product subcategory id is required'),

    body('quantity')
    .isFloat()
    .notEmpty()
    .withMessage('product quantity is required'),

    body('discount_price')
    .isFloat()
    .notEmpty()
    .withMessage('product discount price is required'),

    body('options')
    .isArray()
    .notEmpty()
    .withMessage('product options is required'),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
      
      ]


const categoryValidator = [
  body('category_name')
    .notEmpty()
    .withMessage('category_name is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


const subCategoryValidator = [
  body('subcategory_name')
    .notEmpty()
    .withMessage('subcategory_name is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];



module.exports = { registerValidator, loginValidator, categoryValidator, subCategoryValidator};

