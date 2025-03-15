import dotenv from "dotenv";

dotenv.config();
//App port
export const PORT = process.env.PORT;
//Jwt secret key :
export const JWT_SECRET = process.env.JWT_SECRET;
//gemini api key :
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;