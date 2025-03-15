import { Router } from "express";
import authenticatedMiddleware from "../middlewares/authenticated.js";
import { initializeSleepData, setFactors, setSleepExperience ,getSleepData} from "../controllers/sleepDataController.js";

const sleepRouter = Router();

//initialize : 
sleepRouter.post('/',authenticatedMiddleware,initializeSleepData);
//set sleep experience :
sleepRouter.put('/experience/:id',authenticatedMiddleware,setSleepExperience);
//set sleep factors :
sleepRouter.put('/factors/:id',authenticatedMiddleware,setFactors);
//get specific sleep data :
sleepRouter.get('/:id',authenticatedMiddleware,getSleepData)


export default sleepRouter;