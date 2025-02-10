const {UserService}  = require('../Services/UserService')
const {UserRepository}  = require('../Repository/UserRepository')
const UserSchema = require('../Models/UserSchema')

const userRepo = new UserRepository(UserSchema)
const userServe = new UserService(userRepo)

exports.registerAdmin = async (req,res) => {
    const user = await userServe.createAdmin()
    res.json(user)
}
exports.login = async (req, res) => {
    const user = await userServe.Login(req)
    res.json(user)
}

exports.registerManager = async (req, res) => {
    const response = await userServe.createManager(req)
    return res.json(response)    
}

exports.registerCustomer = async (req, res) => {
        const response = await userServe.createCustomer(req)
        return res.json(response)
}


exports.verifyCustomer = async (req, res) => {
    const response = await userServe.activeCustomer(req)
    return res.json(response)
}

exports.getAllUsers = async (req, res) => {
    const response = await userServe.getAllUsers(req)
    return res.json(response)
}

exports.getUserById = async (req, res) => {
    console.log(req.params);
    const response= await userServe.getUserById(req)
    return res.json(response)
}

exports.getProfile = async (req, res) => {
    const response = await userServe.getProfile(req)
    return res.json(response)
    }

exports.updateUser = async (req, res) => {
        const response= await userServe.updateUser(req)
        return res.json(response)
}

exports.deleteUser = async (req, res) => {
    const response= await userServe.deleteUser(req)
    return res.json(response)
}

