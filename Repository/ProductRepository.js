class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel;
    }

    // Create a new product in the database
    async Create(product) {
        const { sku, product_name,product_image, short_description, long_description, price, subcategory_id, quantity, discount_price, options } = product;
        // Create a new product document and save it to the database
        return await this.productModel.create({
            sku,
            product_image:product_image.map((image) => image.imageUrl),
            product_name,
            subcategory_id,
            short_description,
            long_description,
            price,
            quantity,
            discount_price,
            options
        });
    }

    // Retrieve a list of products based on query parameters
    async getAllProducts(query) {
        const page = query.page ? Math.max(query.page, 1) : 1
        const sort = query.sort || "ASC"

        let productsQuery = {};
        const fieldsToSearch = ['sku', 'product_name'];

        if (query.minPrice || query.maxPrice) {
            if (query.minPrice) {
                productsQuery.price = { ...productsQuery.price, $gte: query.minPrice };
            }
            if (query.maxPrice) {
                productsQuery.price = { ...productsQuery.price, $lte: query.maxPrice };
            }
        }

        let productsQueryCheck = fieldsToSearch
            .filter(field => query.hasOwnProperty(field))
            .map(f => ({
                [f]: query[f]
            }));
        if (productsQueryCheck.length !== 0) productsQuery.$or = productsQueryCheck

        let limit = 2
        const skip = (page - 1) * limit;

        // Query the database for products with the given parameters
        return await this.productModel.find(productsQuery)
            .populate('subcategory_id')
            .sort({ createdAt: sort === 'DESC' ? -1 : 1 })
            .skip(skip)
            .limit(limit);
    }

    // Retrieve a product by its ID

    async GetProductById(productId) {
        return await this.productModel.findOne({ _id: productId }).populate('subcategory_id')
    }

    async UpdateProductById(productId, newDataProduct) {
        return await this.productModel.findOneAndUpdate({ _id: productId }, { $set: newDataProduct }, { new: true })
    }

    async DeleteProductById(id) {
        return await this.productModel.deleteOne({ _id: id });
    }

}

module.exports = { ProductRepository };
