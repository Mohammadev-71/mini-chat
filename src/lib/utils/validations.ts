import * as z from "zod";

const MAX_SIZE = 5*1042*1042
export const signupValidationSchema = z.object({
    img:z.
    instanceof(File,{message:"choose correct file"})
    .refine((file)=>file.size<=MAX_SIZE,{message:"TOO_BIG"})
    .refine((file)=>["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),{message:"TYPES"}).optional(),
    name:z.string().min(1,"TOO_SHORT").max(20,"TOO_LONG"),
    email:z.email("EMAIL"),
    password:z.string().min(8,"SHORT_PASS").max(32,"LONG_PASS").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&_-])[a-zA-Z0-9!@#$%&_-]+$/,"INVALID_PASS")
})


export const signinValidationSchema = z.object({
    email:z.email("EMAIL"),
    password:z.string().min(8,"SHORT_PASS").max(32,"LONG_PASS").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&_-])[a-zA-Z0-9!@#$%&_-]+$/,"INVALID_PASS")
})