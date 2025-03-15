import { z } from "zod";

export const newUserSchema = z.object({
    name : z.string().min(3),
    username : z.string().min(5),
    age      : z.number(),
    password : z.string().min(8),
})