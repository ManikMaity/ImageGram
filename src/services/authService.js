import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { JWT_SECRECT } from "../config/serverConfig.js";


export async function signupService(username, email, password) {
    try{
        const response = await createUser(username, email, password);
        return response;
    }
    catch(err){
        if (err.code === 11000) {
            throw {
                status : 409,
                message : "User already exists",
                success : false
            };
        }
        throw err;
    }
}

export async function signinService(email, password) {
    try{
        const user = await findUserByEmail(email);
        if (!user){
            throw {
                status : 404,
                message : "User not found",
                success : false
            };
        }
        if (bcrypt.compareSync(password, user.password)){
            // make a token with user id which will expire in 7 days 
            const token = JWT.sign({userId : user._id, role : user.role || "user" }, JWT_SECRECT, {expiresIn : 3600 * 168});
            return token;
        }
        else {
            throw {
                status : 401,
                message : "Invalid credentials",
                success : false
            }
        }

    }
    catch(err){
        throw err;
    }
}