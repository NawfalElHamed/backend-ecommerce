const { ProductService } = require('../Services/ProductService');
const { ProductRepository } = require('../Repository/ProductRepository')
const ProductSchema = require('../Models/ProductSchema')


// Initialize the ProductRepository with the ProductSchema
const ProductRepo = new ProductRepository(ProductSchema);

// Initialize the ProductService with the ProductRepository
const ProductServ = new ProductService(ProductRepo);

// Handle product creation request
exports.Create = async (req, res) => {
    // Call the Create method of ProductService to create a product
    const product = await ProductServ.Create(req);
    // Send the created product as a JSON response
    res.json(product);
}

// Handle the request to get all products
exports.getAllProducts = async (req, res) => {
    // Call the getAllProducts method of ProductService to retrieve products
    const products = await ProductServ.getAllProducts(req);
    // Send the list of products as a JSON response
    res.json(products);
}

// Handle the request to get a product by its ID
exports.GetProductById = async (req, res) => {
    // Call the GetProductById method of ProductService to retrieve a product by ID
    const product = await ProductServ.GetProductById(req)
    // Send the product as a JSON response
    res.json(product)
}

exports.UpdateProductById = async (req, res) => {
    const product = await ProductServ.UpdateProductById(req)
    res.json(product)
  }

  exports.DeleteProductById = async (req, res) => {
    const product = await ProductServ.DeleteProductById(req)
    res.json(product)
  }