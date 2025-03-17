import { Router } from "express";
import authenticatedMiddleware from "../middlewares/authenticated.js";
import { generateDailyReport, getReport } from "../controllers/reportController.js";
import { getDates } from "../controllers/agendaController.js";

const reportRouter = Router();

//generate daily report :
reportRouter.get('/generate/:dataId',authenticatedMiddleware,generateDailyReport);
//dates : 
reportRouter.get('/dates',authenticatedMiddleware,getDates);
//get report :
reportRouter.get('/:id',authenticatedMiddleware,getReport);
export default reportRouter;