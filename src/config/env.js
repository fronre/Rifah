import dotenv from "dotenv";

dotenv.config();
//App port
export const PORT = process.env.PORT;
//Jwt secret key :
export const JWT_SECRET = process.env.JWT_SECRET;