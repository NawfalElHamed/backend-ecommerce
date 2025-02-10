const mongoose = require('mongoose');

const userRoles = ['admin','manager','customer'];

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: userRoles,
        default:'admin',
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    active:{
        type : Boolean,
        default : false
    },
    last_login: {
        type: Date,
        default: null
    },
    active_token:{
        type:String,
        default:null
    }
},{timestamps:true})

userSchema.methods.updateLastLogin = function () {
    this.last_login = new Date();
    return this.save();
};


module.exports = mongoose.model('Users', userSchema)