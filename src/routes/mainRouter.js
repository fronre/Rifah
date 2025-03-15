import { Router } from "express";
import userRoute from "./userRouter.js";
import sleepRouter from "./sleepRouter.js";
import reportRouter from "./reportRouter.js";

const mainRouter = Router();

//user router :
mainRouter.use('/user',userRoute);
//sleep data router ;
mainRouter.use('/sleep',sleepRouter);
//report router :
mainRouter.use('/report',reportRouter);

export default mainRouter;