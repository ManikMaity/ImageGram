import e from "express";
import {z} from "zod";

export const zodSignupValidation = z.object({
    username : z.string({
        required_error : "username is required"
    }),
    email : z.string({
        required_error : "email is required"
    })
    .email({
        message : "email is invalid"})
    .min(6, {
        message : "email should be greater than 6 characters"
    }),
    password : z.string({
        required_error : "password is required"
    })
    .min(1, {
        message : "password is required"
    })

})