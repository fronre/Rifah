import { Router } from "express";
import userRoute from "./userRouter.js";
import sleepRouter from "./sleepRouter.js";

const mainRouter = Router();

//user router :
mainRouter.use('/user',userRoute)
mainRouter.use('/sleep',sleepRouter)



export default mainRouter;