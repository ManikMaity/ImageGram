// create a new comment

import CommentModel from "../Model/comment.model.js";

export async function createCommentById(postId, userId, content) {
    try {
        const comment = CommentModel.create({
            content,
            postId,
            userId
        })

        return comment
    }
    catch (err) {
        throw err;
    }
}

export async function getCommentsByPostId(postId) {
    try{
        const comments = await CommentModel.find({postId}).populate("userId", "username").sort({"createdAt" : -1}); 
        return comments;
    }
    catch(err){
        throw err
    }
}

export async function getCommentById(commentId) {
    try {
        const comment = await CommentModel.findById(commentId);
        return comment
    }
    catch(err){
        throw err
    }
}

export async function deleteCommentById(commentId) {
    try{
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);
        return deletedComment
    }
    catch(err){
        throw err
    }
}

export async function getPaginatedCommentByPostId(postId, offset, limit) {
    try {
        const comments = await CommentModel.find({postId}).skip(offset).limit(limit).populate("userId", "username");
        return comments
    }
    catch (err) {
        throw err
    }
}

export async function getAllCommentsByPostIdCount(postId) {
    try {
        const commentCount = await CommentModel.find({postId}).countDocuments();
        return commentCount;
    }
    catch (err) {
        throw err
    }
}