import { createCommentForPostService } from "../services/commentService.js";

export async function createCommentOnPostController (req, res) {
    try {
        const userId = req.user._id;
        const {content, commentableId, onModel} = req.body;
        const comment = await createCommentForPostService(content, commentableId, userId, onModel);
        res.json({
            success: true,
            message: "Comment created successfully",
            data: comment
        })
    }
    catch (err) {
        if (err.status) {
            res.status(err.status).json({
                success: false,
                message: err.message
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}