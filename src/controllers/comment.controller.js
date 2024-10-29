import {
  createCommentService,
  deleteCommentService,
  getCommentsService,
  getPaginatedCommentsService,
  upadteCommentService,
} from "../services/commentService.js";

export async function check(req, res) {
  res.json({
    msg: "Comment router is working✔️",
  });
}

export async function createCommentController(req, res) {
  try {
    const { postId, content } = req.body;
    const userId = req.user._id;
    const comment = await createCommentService(content, postId, userId);
    res.json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (err) {
    console.log(err);
    if (err.status) {
      res.status(err.status).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export async function getCommentsController(req, res) {
  try {
    const postId = req.params.postId;
    console.log(postId);
    const comments = await getCommentsService(postId);
    res.json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (err) {
    console.log(err);
    if (err.status) {
      res.status(err.status).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

export async function updateCommentController(req, res) {
  try {
    const commentId = req.params.commentId;
    const { content } = req.body;
    const userId = req.user._id;
    const updatedComment = await upadteCommentService(commentId, content, userId);
    res.json({
      success: true,
      message: "Comment updated successfully",
      data: updatedComment,
    });
  } 
  catch (err) {
    console.log(err);
    if (err.status) {
      res.status(err.status).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}


export async function deleteCommentController(req, res) {
    try {
        const commentId = req.params.commentId;
        const userId = req.user._id;
        const deletedComment = await deleteCommentService(commentId, userId);
        res.json({
            success: true,
            message: "Comment deleted successfully",
            data: deletedComment,
        });
    }
    catch (err) {
        console.log(err);
        if (err.status) {
            res.status(err.status).json({
                success: false,
                message: err.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
}

export async function getPaginatedCommentsController(req, res) {
  try {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    const postId = req.params.postId;
    const data = await getPaginatedCommentsService(offset, limit, postId);
    res.json({
      success: true,
      message: "Comments fetched successfully",
      data: data,
    });
  }
  catch(err) {
    if (err.status) {
      res.status(err.status).json({
        success: false,
        message: err.message,
      })
    }
    else {
      res.status(500).json({
        success: false,
        message: err.message,
      })
    }
  }
}