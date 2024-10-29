import express from "express";
import { deletePostController, getAllPostController, postController, postUpdateController } from "../../controllers/post.controller.js";
import { validate } from "../../validators/zodValidator.js";
import { zodPostValidation } from "../../validators/zodPostValidation.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { isAuthorisedAdmin } from "../../middleware/authorisation.js";

const postRouter = express.Router();

/**
 * @swagger
 * /post/create:
 *  post:
 *     summary: Create post
 *     description: Create a new post
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              
 *     responses:
 *          200:
 *              description: Post created successfully
 *          500:
 *              description: Internal server error
 *          400:
 *              description: Validation error
 *          401:
 *              description: Unauthorized
 */

postRouter.post("/create", validate(zodPostValidation), isAuthenticated, postController)
postRouter.get("/all", getAllPostController)
postRouter.delete("/delete", isAuthenticated, deletePostController)
postRouter.put("/update", isAuthorisedAdmin, isAuthenticated, postUpdateController)

export default postRouter