import JWT from "jsonwebtoken";
import { JWT_SECRECT } from "../config/serverConfig.js";

export const isAuthorisedAdmin = async (req, res, next) => {
    try{
        const token = req.headers.token;
        if (!token){
            throw {
                status : 401,
                message : "Token not found",
                success : false
            }
        }
        const decodedData = await JWT.verify(token, JWT_SECRECT);
        if (decodedData.role !== "admin"){
            throw {
                status : 401,
                message : "You are not an admin, you are not allowed",
                success : false
            }
        }
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