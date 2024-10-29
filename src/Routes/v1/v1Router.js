import express from "express";
import userRouter from "./user.js";
import postRouter from "./post.js";
import { signinController, signupController } from "../../controllers/auth.controller.js";
import { validate } from "../../validators/zodValidator.js";
import { zodSignupValidation } from "../../validators/zodSignupValidator.js";
import { zodSigninValidation } from "../../validators/zodSigninValidator.js";
import commentRouter from "./comment.js";
const v1Router = express.Router();



v1Router.use("/user", userRouter);
v1Router.use("/post", postRouter);
v1Router.use("/comment", commentRouter)

/**
 * @swagger
 * /signup:
 *  post:
 *     summary: Create user
 *     description: Create a new user
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             
 *     responses:
 *          200:
 *              description: User created successfully
 *          500:
 *              description: Internal server error
 *          400:
 */
v1Router.post("/signup", validate(zodSignupValidation), signupController)
v1Router.post("/signin", validate(zodSigninValidation), signinController);


export default v1Router;