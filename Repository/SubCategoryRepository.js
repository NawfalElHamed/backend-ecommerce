class SubCategoryRepository {
    constructor(subCategoryModel) {
        this.subCategoryModel = subCategoryModel;
    }

    async AddSubCategory(subCategory) {
        // Destructure the 'subCategory' object to extract 'subcategory_name' and 'category_id'
        const { subcategory_name, category_id } = subCategory;

        // Use the 'subCategoryModel' to create a new subcategory record in the database
        // and return the result, which is an asynchronous operation
        return await this.subCategoryModel.create({
            subcategory_name,
            category_id
        });
    }

    async GetAllSubCategories(params) {
        // Create an empty query object for filtering sub-categories.
        const subCategoriesQuery = {};

        // Check if the 'query' parameter is provided for searching.
        if (params.query) {
            // Build a query to search for sub-categories whose name matches 'params.query' (case-insensitive).
            subCategoriesQuery.$or = [
                { subcategory_name: { $regex: params.query, $options: 'i' } }
            ];
        }

        // Define the number of sub-categories to display per page.
        const SUBCATEGORIES_PER_PAGE = 2;

        // Calculate the number of items to skip based on the page number.
        const skip = (params.page - 1) * SUBCATEGORIES_PER_PAGE;

        // Perform the query to retrieve sub-categories.
        const subCategories = await this.subCategoryModel
            .find(subCategoriesQuery)           // Filter sub-categories based on 'subCategoriesQuery'.
            .populate('category_id')            // Retrieve information about the associated category.
            .sort({ createdAt: params.sort === 'DESC' ? -1 : 1 }) // Sort sub-categories based on 'params.sort'.
            .skip(skip)                        // Skip items based on pagination.
            .limit(SUBCATEGORIES_PER_PAGE);     // Limit the number of results returned per page.

        // Transform the data of sub-categories into a new format.
        const transformedData = subCategories.map(subcategory => ({
            _id: subcategory._id,                  // ID of the sub-category.
            subcategory_name: subcategory.subcategory_name, // Name of the sub-category.
            category_id: subcategory.category_id._id,      // ID of the associated category.
            category_name: subcategory.category_id.category_name, // Name of the associated category.
            active: subcategory.active,            // Activation status of the sub-category.
        }));

        // Return the transformed data.
        return transformedData;
    }

    async GetSubCategoryById(idSubCategory) {
        // Retrieve a sub-category by its ID from the database and populate the 'category_id' field.
        const subCategory = await this.subCategoryModel.findOne({ _id: idSubCategory }).populate('category_id');

        // Transform the data of the retrieved sub-category into a new format.
        const transformedData = {
            _id: subCategory._id,                                   // ID of the sub-category.
            subcategory_name: subCategory.subcategory_name,         // Name of the sub-category.
            category_id: subCategory.category_id._id,               // ID of the associated category.
            category_name: subCategory.category_id.category_name,   // Name of the associated category.
            active: subCategory.active,                             // Activation status of the sub-category.
        };

        // Return the transformed data.
        return transformedData;
    }

    async UpdateSubCategoryById(idSubCategory,newDataSubCategory){
        // Find a sub-category by its ID and update it with the new data.
        return await this.subCategoryModel.findOneAndUpdate({_id:idSubCategory},{$set:newDataSubCategory},{new:true})
    }

    async DeleteSubCategoryById(idSubCategory) {
        // Finds a document with the provided ID and deletes it
        return await this.subCategoryModel.findOneAndDelete({_id:idSubCategory});
    }

    async GetSubsOfCategory(idCategory){
        return this.subCategoryModel.find({category_id:idCategory})
    }


}


module.exports = { SubCategoryRepository };