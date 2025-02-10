class UserRepository{

    constructor(userModel) {
        this.userModel = userModel;
    }

    async getAdminUsers(){
        const adminUsers = await this.userModel.find({ role: 'admin' });
        console.log('Admin users fetched successfully');
        return adminUsers;
    };

    async Register(user) {
        const {first_name,last_name,email,role,user_name,password,active,active_token} = user;
        const newUser = await this.userModel.create({
            first_name,
            last_name,
            email,
            role,
            user_name,
            password,
            active,
            active_token
        })
        return newUser
    }

    async Login(email) {
        const user = await this.userModel.findOne({ email: email })
        return user
    }

    async activeCustomer(id){
        const data = {
            active_token:null,
            active:true,
        };
        const user= await this.userModel.findOneAndUpdate({_id: id},data,{new: true});
        console.log('User activated successfully');
        return user;
};

async getAllUsers(query){
    let usersQuery = {};
    // console.log(typeof query.page)
    let page=query.page || 1
    let sort=query.sort || "ASC"
    const fieldsToSearch = ['first_name', 'last_name', 'role'];

        let qr = fieldsToSearch
            .filter(field => query.hasOwnProperty(field))
            .map(f => ({
                [f]: (f!='role' ? query[f] : query[f].toLowerCase())
            }));
        
            // console.log(qr);
        if(qr.length!=0) usersQuery.$and=qr

        console.log(usersQuery);

    const COSTUMERS_PER_PAGE = 10;
    const skip = (page - 1) * COSTUMERS_PER_PAGE;

     return await this.userModel.find(usersQuery)
                                    .sort({ createdAt: sort === 'DESC' ? -1 : 1 })
                                    .skip(skip)
                                    .limit(COSTUMERS_PER_PAGE);
}

async getUserById(id){
    const user= await this.userModel.findById(id);
    console.log(id);
    if (!user) return null
    console.log('users fetched successfully');
    return user;
};

// async getProfile(id){
//     const user = await this.userModel.findById(id)
//     return user
// }

async updateUser(id,data){
    const user= await this.userModel.findOneAndUpdate({_id: id},data,{new: true});
    console.log('User updated successfully');
    return user;
};


async deleteUser(id){
    const user= await this.userModel.findOneAndDelete({_id: id});
    return user;
};


}


module.exports = {UserRepository}