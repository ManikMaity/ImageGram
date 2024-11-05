import {z} from "zod";

const zodComment2Validation = z.object({
    content : z.string({
        required_error : "Comment content is required",
        invalid_type_error : "Comment content must be a string",
    })
    .max(200, "Comment content must be less than 200 characters")
    .min(1, "Comment content is required"),

    commentableId : z.string({
        required_error : "Post id is required",
        invalid_type_error : "Post id must be a string",
    }),
    onModel : z.enum(["Post", "Comment"], {
        required_error : "onModel is required",
        invalid_type_error : "onModel must be a string",
    })
})

export default zodComment2Validation;