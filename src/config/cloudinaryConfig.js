import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_KEY, CLOUDINARY_SECRECT } from "./serverConfig.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { url } from "inspector";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.config({
  cloud_name: "dp4roeps2",
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRECT,
});

export async function uploadImageInCloudinary(imagename) {
  try {
    const relativePath = path.join(__dirname, `../../public/${imagename}`);
    const result = await cloudinary.uploader.upload(relativePath);
    console.log("Image uploaded successfully");
    console.log(result);
    console.log(result.url);
    return {
     url:  result?.url,
     public_id : result?.public_id
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function deleteImageFromCloudinary(imagename) {
  try {
    const result = await cloudinary.uploader.destroy(imagename);
    console.log("Image deleted successfully");
    console.log(result);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
