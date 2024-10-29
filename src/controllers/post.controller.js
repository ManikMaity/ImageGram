import { createPostService, deletePostService, getPaginatedPostsService, updatePostService } from "../services/postService.js";

export async function postController(req, res) {
    try{
        const userId = req.user._id;
        const {content, image} = req.body;
        await createPostService(content, userId, image);
        res.json({msg : "Post created successfully"});
    }
    catch(err){
        res.status(500).json({msg : err.message});
    }

}

// We want it to be paginated format with limit and offset
// ex - http://localhost:3000/api/post/all?offset=1&limit=10

export async function getAllPostController(req, res) {
    try{
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 10;
        const data = await getPaginatedPostsService(offset, limit);
        res.json({
            success : true,
            message : "Post fetched successfully",
            data : data
        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message,
            data : null
        });
    }
}

export async function deletePostController(req, res){
    try{
        const userId = req.user._id;
        const id = req.query.id;
        await deletePostService(id, userId);
        res.json({
            success : true,
            message : "Post deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}


export async function postUpdateController(req, res){
    try{
        // const {id, content, image} = req.body;
        const id = req.body.id;
        const content = req.body.content || "";
        const image = req.body.image || "";
        console.log(id, content, image, "Post Controller");
        const data = await updatePostService(id, content, image);
        res.json({
            success : true,
            message : "Post updated successfully",
            data
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}