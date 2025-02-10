const CONSTANTS = require('../Config/Constants')
const { HashPassword, VerifyPassword } = require('../Helpers/Hashing')
const { jwtSecret } = require('../Config/config')
const JwtManager = require('../Helpers/JWT')

const sendEmail = require('../Helpers/emailConfig')
const { sendResponse } = require('../Helpers/sendResponse')
const axios = require('axios')
const crypto = require('crypto');


class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async createAdmin() {

        try {
            const response = {};
            let admins = await this.getAdminUsers();

            if (admins != 0) {
                return sendResponse(CONSTANTS.ADMIN_EXIST, CONSTANTS.SERVER_ERROR_HTTP_CODE)
            }
            else {
                const admin = {
                    "first_name": "admin",
                    "last_name": "admin",
                    "email": "admin@admin.com",
                    "user_name": "admin",
                    "password": await HashPassword('admin123'),
                    "active": true
                };
                const user = await this.userRepo.Register(admin);
                if (!user) {
                    return sendResponse(CONSTANTS.SERVER_ERROR_MESSAGE, CONSTANTS.SERVER_ERROR_HTTP_CODE)
                }

                response.message = CONSTANTS.USER_CREATED;
                response.status = CONSTANTS.SERVER_CREATED_HTTP_CODE;
                response.data = user;
                return sendResponse(CONSTANTS.USER_CREATED, CONSTANTS.SERVER_CREATED_HTTP_CODE, { user })
            }
        } catch (error) {
            console.error('Error creating admin:', error.message);
        }
    }

    async getAdminUsers() {
        try {
            const adminUsers = await this.userRepo.getAdminUsers();
            // console.log(adminUsers)
            return adminUsers.length
        } catch (error) {
            console.log(error.message);
        }
    }

    async Login(req) {
        try {
            const { email, password } = req.body
            const user = await this.userRepo.Login(email)
            if (!user) {
                return sendResponse(CONSTANTS.LOGIN_ERROR, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            }
            const passwordMatch = await VerifyPassword(password, user.password)
            if (!passwordMatch) {
                return sendResponse(CONSTANTS.LOGIN_ERROR, CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE)
            }
            const token = JwtManager.sign({ userId: user._id, firstName: user.first_name, lastName: user.last_name, userName: user.user_name, role: user.role, activeToken: user.active_token }, jwtSecret)
            await user.updateLastLogin();
            return sendResponse(CONSTANTS.USER_LOGIN_OK, CONSTANTS.SERVER_OK_HTTP_CODE, { token })
        } catch (error) {
            console.error('Error getting logged:', error.message);
        }
    }

    async createManager(req) {
        try {
            if (req.user.role == "admin") {
                const { first_name, last_name, email, user_name, password, active } = req.body;
                const manager = {
                    first_name,
                    last_name,
                    email,
                    role: "manager",
                    user_name,
                    password: await HashPassword(password),
                    active: true
                };
                const user = await this.userRepo.Register(manager);
                if (!user) {
                    return sendResponse(CONSTANTS.SERVER_ERROR_MESSAGE, CONSTANTS.SERVER_ERROR_HTTP_CODE)
                }
                return sendResponse(CONSTANTS.USER_CREATED, CONSTANTS.SERVER_CREATED_HTTP_CODE, { user })
            }
            return "You are not authorized to create user"
        }
        catch (error) {
            console.error('Error creating manager:', error.message);
        }
    }

    async createCustomer(req) {
        try {

            const { first_name, last_name, email, user_name, password } = req.body;

            const customer = {
                first_name,
                last_name,
                email,
                role: "customer",
                user_name,
                password: await HashPassword(password),
                active_token: crypto.randomBytes(32).toString('hex'),
            };

            const user = await this.userRepo.Register(customer);
            if (!user) {
                return sendResponse(CONSTANTS.SERVER_ERROR_MESSAGE, CONSTANTS.SERVER_ERROR_HTTP_CODE)
            }
            const dataToSend = {
                email,
                password
            };

            const loginResponse = await axios.post('http://127.0.0.1:5000/users/login', dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            sendEmail(email, user.active_token)

            return sendResponse(CONSTANTS.USER_CREATED, CONSTANTS.SERVER_CREATED_HTTP_CODE, { user, "token": loginResponse.data.dataResponse.token })
        } catch (error) {
            console.log('Error:', error);
            return 'Error creating customer:', error.message
        }
    }

    async activeCustomer(req){
        try {
            const queryToken=req.query.token
            const activeToken=req.user.activeToken
            const customerId=req.user.userId
            if(queryToken==activeToken){
                const user = await this.userRepo.activeCustomer(customerId);
                return user
            }
            return sendResponse(CONSTANTS.WRONG_TOKEN,CONSTANTS.SERVER_ERROR_HTTP_CODE)
        } catch (error) {
            console.error('Error activating customer:', error.message);
        }
}

async getAllUsers(req){
    try {
        if(req.user.role=="admin"){
            const query=req.query  
            const users = await this.userRepo.getAllUsers(query);
            // const users = await this.userRepo.getAllUsers(query);
            return users
        }
        return sendResponse(CONSTANTS.NOT_AUTHORIZED,CONSTANTS.SERVER_ERROR_HTTP_CODE)
    } catch (error) {
        console.error('Error getting all users:', error.message);
    }
}

async getUserById(req){
    const role = req.user.role
    const userId = req.params.id
    try {
        if(role=="admin"){
            const user = await this.userRepo.getUserById(userId);
            if(!user){
                return sendResponse(CONSTANTS.USER_NOT_FOUND,CONSTANTS.SERVER_ERROR_HTTP_CODE)
            }
            return sendResponse(CONSTANTS.USER_FOUND,CONSTANTS.SERVER_CREATED_HTTP_CODE,{user})
        }
        return sendResponse(CONSTANTS.NOT_AUTHORIZED,CONSTANTS.SERVER_ERROR_HTTP_CODE)
    } catch (error) {
        console.error('yesError getting user:', error.message);
        return sendResponse(CONSTANTS.USER_NOT_FOUND,CONSTANTS.SERVER_ERROR_HTTP_CODE)
    }
}

async getProfile(req) {
    try {
        const user = req.user
        return sendResponse("Success",CONSTANTS.SERVER_OK_HTTP_CODE,{user})
    } catch (error) {
        console.error('Error getting profile of user:', error.message);
    }
}

async updateUser(req){
    try {
        const id=req.params.id
        if(req.user.role=="admin" || req.user.userId==id){
            const data=req.body
            const user = await this.userRepo.updateUser(id,data);
            if(!user){
                return sendResponse(CONSTANTS.USER_NOT_FOUND,CONSTANTS.SERVER_ERROR_HTTP_CODE)
            }
            else{
                return sendResponse("user updated",CONSTANTS.SERVER_OK_HTTP_CODE)
            }
        }
        return sendResponse("You are not authorized to update",CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE)
    } catch (error) {
        return sendResponse(CONSTANTS.USER_NOT_FOUND,CONSTANTS.SERVER_ERROR_HTTP_CODE)
    }
 }

 async deleteUser(req){
    let user
    try {
        const id=req.params.id
        if(req.user.role=="admin" || (req.user.role=="customer" && req.user.userId==id)){
            user = await this.userRepo.deleteUser(id);
            if(!user) return sendResponse(CONSTANTS.USER_NOT_FOUND,CONSTANTS.SERVER_ERROR_HTTP_CODE)
            return sendResponse(CONSTANTS.USER_DELETED,CONSTANTS.SERVER_OK_HTTP_CODE,{user})
        }
        return sendResponse(CONSTANTS.NOT_AUTHORIZED,CONSTANTS.SERVER_OK_HTTP_CODE)
    } catch (error) {
        return sendResponse(CONSTANTS.USER_NOT_FOUND,CONSTANTS.SERVER_ERROR_HTTP_CODE)
    }
}


}


module.exports = { UserService }