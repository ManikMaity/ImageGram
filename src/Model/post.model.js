import mongoose, { Schema } from "mongoose";
import { optional } from "zod";

const postSchema = new Schema({
    postContent : {
        type : String,
        reqiured : true,  
    },
    user : {
        type : Schema.ObjectId,
        ref : "User",
        reqiured : true
    },
    image : {
        type : String,
        reqiured : true,
        validate : {
            validator : (value) => {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/i.test(value)
            },
            message : "Invalid Image url"
        }
    },
    imageName : {
        type : String,
        optional : true
    }

}, {timestamps : true});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;