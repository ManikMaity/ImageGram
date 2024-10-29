import express from "express";
import { check, createCommentController, deleteCommentController, getCommentsController, getPaginatedCommentsController, updateCommentController } from "../../controllers/comment.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { validate } from "../../validators/zodValidator.js";
import zodCommentValidation from "../../validators/zodCommentValidator.js";
const commentRouter = express.Router();

/**
 * @swagger
 * /comment:
 *  get:
 *     summary: check comment router is working
 *     description: check comment router is working
 *     responses:
 *          200:
 *              description: Comment router is working
 */
commentRouter.get("/", check)

/**
 * @swagger
 * /comment/create:
 *  post:
 *     summary: Create comment
 *     description: Create a new comment
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      content:
 *                          type: string
 *                          required: true
 *                          description: Comment content
 *                      postId:
 *                          type: string
 *                          required: true
 *                          description: Post id
 *              
 *     responses:
 *          200:
 *              description: Comment created successfully
 *          500:
 *              description: Internal server error
 *          400:
 *              description: Validation error
 *          401:
 *              description: Unauthorized
 */
commentRouter.post("/create", validate(zodCommentValidation), isAuthenticated, createCommentController);

// getting comments for post
/**
 * @swagger
 * /comment/{postId}:
 *  get:
 *     summary: get comments for post
 *     description: get comments for post
 *     parameters:
 *      - in: path
 *        name: postId
 *        type: string
 *        required: true
 *      - in: header
 *        name: token
 *        type: string
 *        required: true
 *     responses:
 *          200:
 *              description: Comment fetched successfully
 *          500:
 *              description: Internal server error
 *          400:
 *              description: Validation error
 *          401:
 *              description: Unauthorized
 */
commentRouter.get("/:postId", isAuthenticated, getCommentsController)

// update a comment
/** 
 * @swagger
 * /comment/{commentId}:
 *  put:
 *     summary: update a comment 
 *     description: update comment by user
 *     parameters:
 *      - in: path
 *        name: commentId
 *        type: string
 *        required: true
 *      - in: header
 *        name: token
 *        type: string
 *        required: true
 *     requestBody: 
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      content:
 *                          type: string
 *                          required: true
 *                          description: Comment content
 *     responses:
 *          200:
 *              description: Comment fetched successfully
 *          500:
 *              description: Internal server error
 *          400:
 *              description: Validation error
 *          401:
 *              description: You are not authorized to update this comment
 */
commentRouter.put("/:commentId", isAuthenticated, updateCommentController)

// delete a comment
/** 
 * @swagger
 * /comment/{commentId}:
 *  delete:
 *     summary: delete a comment 
 *     description: delete comment by user
 *     parameters:
 *      - in: path
 *        name: commentId
 *        type: string
 *        required: true
 *      - in: header
 *        name: token
 *        type: string
 *        required: true
 *     responses:
 *          200:
 *              description: Comment deleted successfully
 *          500:
 *              description: Internal server error
 *          400:
 *              description: Validation error
 *          401:
 *              description: You are not authorized to delete this comment
 * 
 */
commentRouter.delete("/:commentId", isAuthenticated, deleteCommentController)

// get paginated comments
/**
 * @swagger
 * /comment/671c7fab0224e96dd540e086/paginated?offset={offset}&limit={limit}:
 *  get:
 *     summary: get paginated comments for post
 *     description: get paginated comments for post
 *     parameters:
 *      - in: query
 *        name: offset
 *        type: string
 *        required: true
 *      - in: query
 *        name: limit
 *        type: string
 *        required: true
 *      - in: header
 *        name: token
 *        type: string
 *        required: true
 *     responses:
 *          200:
 *              description: Comment fetched successfully
 *          500:
 *              description: Internal server error
 *          400:
 *              description: Validation error
 *          401:
 *              description: Unauthorized
 */
commentRouter.get("/:postId/paginated", isAuthenticated, getPaginatedCommentsController)


export default commentRouter;