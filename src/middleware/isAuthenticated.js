import JWT from "jsonwebtoken";
import { JWT_SECRECT } from "../config/serverConfig.js";
import { findPostById } from "../repositories/postRepository.js";
import { findUserById } from "../repositories/userRepository.js";

export async function isAuthenticated(req, res, next) {
    try{
        const token = req.headers.token;
        if (!token) {
            throw {
                status : 401,
                message : "Token not found",
                success : false
            }
        }
        const decodedData = JWT.verify(token, JWT_SECRECT);
        const user = await findUserById(decodedData.userId);
        if (!user) {
            throw {
                status : 401,
                message : "Wrong credentials",
                success : false 
            }
        };
        req.user = user;
        next();
    }
    catch(err){
        if (err.status) {
            res.status(err.status).json({
                success : false,
                message : err.message
            })
        }
        else {
        res.status(401).json({
            success : false,
            message : err.message
        })
    }   
    }
}