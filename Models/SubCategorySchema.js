const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    subcategory_name: {
        type: String,
        required: true,
        unique: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Référence au modèle de catégorie
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Subcategory', subcategorySchema);
