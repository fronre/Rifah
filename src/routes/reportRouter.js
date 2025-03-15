import { Router } from "express";
import authenticatedMiddleware from "../middlewares/authenticated.js";
import { generateDailyReport } from "../controllers/reportController.js";

const reportRouter = Router();

//generate daily report :
reportRouter.get('/generate/:dataId',authenticatedMiddleware,generateDailyReport);


export default reportRouter;