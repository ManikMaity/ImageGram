import { deleteImageFromCloudinary, uploadImageInCloudinary } from "../config/cloudinaryConfig.js";
import {
  createPost,
  deletePostById,
  findPostById,
  getPaginatedPosts,
  getTotalPosts,
  updatePostById,
} from "../repositories/postRepository.js";

export async function createPostService(content, userId, image) {
  try {
    // Add cloudinary to upload image and get a url
    const { url : imageUrl, public_id : imageName } = await uploadImageInCloudinary(image);
    await createPost(content, userId, imageUrl, imageName);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getPaginatedPostsService(offset, limit) {
  try {
    const posts = await getPaginatedPosts(offset, limit);
    const totalPosts = await getTotalPosts();
    const totalPages = Math.floor(totalPosts / limit);
    return {
      posts,
      totalPosts,
      totalPages,
    };
  } catch (err) {
    throw new Error(err);
  }
}

export async function deletePostService(id, userId) {
    try{
        const data = await deletePostById(id, userId)
        if (data) {
          await deleteImageFromCloudinary(data?.imageName);
        }
        return data
    }
    catch(err){
        throw new Error(err)
    }
}


export async function updatePostService(id, content, image) {
    try{

        let uploadData;
        if (image) {
            const post = await findPostById(id);
            await deleteImageFromCloudinary(post?.imageName);
            uploadData = await uploadImageInCloudinary(image);
        }

        const data = {
            postContent : content,
            image : uploadData?.url,
            imageName : uploadData?.public_id
        }
        
        Object.keys(data).forEach((k) => data[k] == '' && delete data[k]);
        console.log(id, data, "Post Service")
        const response = await updatePostById(id, data);
        return response;
    }
    catch(err){
        throw new Error(err)
    }
}