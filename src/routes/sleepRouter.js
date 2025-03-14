import { Router } from "express";
import authenticatedMiddleware from "../middlewares/authenticated";
import { initializeSleepData, setFactors, setSleepExperience } from "../controllers/sleepDataController";

const sleepRouter = Router();

//initialize : 
sleepRouter.post('/',authenticatedMiddleware,initializeSleepData);
//set sleep experience :
sleepRouter.put('/experience/:id',authenticatedMiddleware,setSleepExperience);
//set sleep factors :
sleepRouter.put('/factors/:id',authenticatedMiddleware,setFactors);