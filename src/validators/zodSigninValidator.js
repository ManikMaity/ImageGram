import {z} from "zod";

export const zodSigninValidation = z.object({
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

});
