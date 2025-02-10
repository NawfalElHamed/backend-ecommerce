class CategoryRepository {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    async AddCategory(category) {
        // Extract the 'category_name' property from the 'category' object
        const { category_name } = category;
        
        // Use the 'categoryModel' to create a new category entry in the data store
        return await this.categoryModel.create({
            category_name
        });
    }

    async GetAllCategories(params) {
        const categoriesQuery = {}; // Initialize a query object for categories.
    
        if (params.query) {
            // If search query parameters are specified, set up a $or clause to search in the 'category_name' field.
            categoriesQuery.$or = [
                { category_name: { $regex: params.query, $options: 'i' } }
            ];
        }
    
        const CATEGORIES_PER_PAGE = 2; // Number of categories per page to display.
        const skip = (params.page - 1) * CATEGORIES_PER_PAGE; // Calculate the amount of records to skip.
    
        // Use the 'find' method to search for categories in the database.
        // Apply the 'categoriesQuery' search clause, sort the results based on 'createdAt' (ascending or descending),
        // skip records based on 'skip', and limit the number of records returned based on 'CATEGORIES_PER_PAGE'.
        return await this.categoryModel.find(categoriesQuery)
            .sort({ createdAt: params.sort === 'DESC' ? -1 : 1 })
            .skip(skip)
            .limit(CATEGORIES_PER_PAGE);
    }
    


    async GetCategoryById(idCategory) {
        // Use the 'findOne' method to search for a category in the database based on its '_id' field.
        return await this.categoryModel.findOne({ _id: idCategory });
    }
    
    async UpdateCategoryById(idCategory, newDataCategory) {
        // Use the 'findOneAndUpdate' method to find and update a category in the database based on its '_id'.
        // The '{new: true}' option ensures that the updated category is returned after the update operation.
        return await this.categoryModel.findOneAndUpdate({ _id: idCategory }, { $set: newDataCategory }, { new: true });
    }

    async DeleteCategoryById(idCategory) {
        // Deletes a document that matches the specified filter
        return await this.categoryModel.deleteOne({_id:idCategory});
    }
    
    

}

module.exports = { CategoryRepository };