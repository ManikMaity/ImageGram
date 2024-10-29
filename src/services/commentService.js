import {
  createCommentById,
  deleteCommentById,
  getAllCommentsByPostIdCount,
  getCommentById,
  getCommentsByPostId,
  getPaginatedCommentByPostId,
} from "../repositories/comment.repo.js";

export async function createCommentService(content, postId, userId) {
  try {
    if (content.trim() == "") {
      throw {
        status: 400,
        message: "Comment content is required",
        success: false,
      };
    }
    const comment = await createCommentById(postId, userId, content);
    return comment;
  } catch (err) {
    throw err;
  }
}

export async function getCommentsService(postId) {
  try {
    const comments = await getCommentsByPostId(postId);
    return comments;
  } catch (err) {
    throw err;
  }
}

export async function upadteCommentService(commentId, content, userId) {
  try {
    if (content.trim() == "") {
      throw {
        status: 400,
        message: "Comment content is required",
        success: false,
      };
    }
    if (content.length > 300) {
      throw {
        status: 400,
        message: "Comment content is too long",
        success: false,
      };
    }
    const comment = await getCommentById(commentId);
    if (comment.userId.toString() !== userId.toString()) {
      throw {
        status: 400,
        message: "You are not authorized to update this comment",
        success: false,
      };
    }
    comment.content = content;
    await comment.save();
    return comment;
  } catch (err) {
    throw err;
  }
}

export async function deleteCommentService(commentId, userId) {
  try {
    const comment = await getCommentById(commentId);
    if (comment.userId.toString() !== userId.toString()) {
      throw {
        status: 400,
        message: "You are not authorized to delete this comment",
        success: false,
      };
    }
    const deletedComment = await deleteCommentById(commentId);
    return deletedComment;
  } catch (err) {
    throw err;
  }
}

export async function getPaginatedCommentsService(offset, limit, postId) {
  try {
    const comments = await getPaginatedCommentByPostId(postId, offset, limit);
    const totalComments = await getAllCommentsByPostIdCount(postId);
    const totalPages = Math.floor(totalComments / limit);
    return {
      comments,
      totalComments,
      totalPages,
    };

  } catch (err) {
    throw err;
  }
}
