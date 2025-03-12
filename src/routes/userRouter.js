import { Router } from "express";
import { authenticated, login, register } from "../controllers/userController.js";
import authenticatedMiddleware from "../middlewares/authenticated.js";

const userRoute = Router();

//register :
userRoute.post('/register',register);
//login : 
userRoute.post('/login',login);
//authenticated :
userRoute.get("/authenticated",authenticatedMiddleware,authenticated)

export default userRoute;