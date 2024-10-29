import UserModel from "../Model/user.model.js";

export async function findUserByEmail(email) {
    try{
        const user = await UserModel.findOne({email});
        return user;
    }
    catch (err){
        console.log(err)
    }
}


export async function  findUserById(id) {
    try{
        const user = await UserModel.findById(id);
        return user;
    }
    catch(err){
        throw err;
    }
}

export async function createUser(username, email, password) {
    try{
        const user = await UserModel.create({username, email, password})
        return user
    }
    catch(err){
        throw err;
    }
}


export async function findAllUser() {
    try{
        const user = await UserModel.find();
        return user;
    }
    catch(err){
        console.log(err)
    }
}