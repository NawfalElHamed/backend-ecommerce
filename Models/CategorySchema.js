const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    },
    
    active :{
        type : Boolean,
        required : true,
        default : false,
    },

    

},{timestamps:true,versionKey:false})



module.exports = mongoose.model('Category', categorySchema)