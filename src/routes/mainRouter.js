import { Router } from "express";
import userRoute from "./userRouter.js";

const mainRouter = Router();

//user router :
mainRouter.use('/user',userRoute)



export default mainRouter;