import dotenv from "dotenv";
dotenv.config()

export const DB_URL = process.env.MONGODB_CONNECTION_STRING;
export const CLOUDINARY_SECRECT = process.env.CLOUDINARY_SECRECT;
export const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
export const SALT_ROUND = Number(process.env.SALT_ROUND);
export const JWT_SECRECT = process.env.JWT_SECRECT;