import PostModel from "../Model/post.model.js"

export const createPost = async (content, userId, image, imageName) => {
    try{
        console.log(userId);
        const post = await PostModel.create({
            postContent : content,
            user : userId,
            image : image,
            imageName : imageName
        })
        console.log("Post created successfully.", post);
    }
    catch(err){
        throw new Error(err)
    }
}


export const findAllPost = async () => {
    try{
        const post = await PostModel.find({})
        return post
    }
    catch(err){
        console.log(err)
    }
}


export const getPaginatedPosts = async (offset, limit) => {
    try{
        const post = await PostModel.find().sort({"createdAt" : -1}).skip(offset).limit(limit).populate("user", "username email _id");
        return post;
    }
    catch(err){
        throw new Error(err)
        console.log(err)
    }
}

export const getTotalPosts = async () => {
    try{
        const post = await PostModel.countDocuments();
        return post
    }
    catch(err){
        console.log(err)
        throw new Error(err)
    }
}


export const findPostById = async (id) => {
    try{
        const post = await PostModel.findById(id)
        return post
    }
    catch(err){
        console.log(err)
    }
}

export async function deletePostById(id, userId) {
    try{
        const post = await PostModel.findById(id).populate("user", "_id");
        if (post.user._id.toString() == userId.toString()) {
            const data =  await PostModel.findByIdAndDelete(id);
            return data;
        }else{
           throw new Error("You are not authorized to delete this post");
           
        }
    }
    catch(err){
        throw new Error(err);   
    }   
}

export async function updatePostById(id, data) {
    try{
        const responseData = await PostModel.findByIdAndUpdate(id, {
            $set : data}, {new : true});
        return responseData;
    }
    catch(err){
        throw new Error(err);
    }
    
}