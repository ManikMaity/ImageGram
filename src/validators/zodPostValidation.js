import { z } from "zod";

export const zodPostValidation = z.object({
  content: z
    .string({
      required_error: "Post content is required",
      invalid_type_error: "Post content must be a string",
    })
    .min(1, "Post content is required")
    .max(500, "Post content must be less than 500 characters"),
  image: z
    .string()
    .max(100, {message : "The image name must be less than 100 characters"})
    .refine((value) => /\.(jpg|jpeg|png|gif|webp)$/i.test(value), {
      message:
        "The image name must end with one of the following extensions: .jpg, .jpeg, .png, .gif, .webp",
    })
});
