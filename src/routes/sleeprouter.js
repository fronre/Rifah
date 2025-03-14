import { Router } from "express";
import { setSleepData, setSleepExperience, setFactors, getSleepData } from "../controllers/sleepController.js";

const sleepRouter = Router();

sleepRouter.post("/data", setSleepData);
sleepRouter.post("/experience", setSleepExperience);
sleepRouter.post("/factors", setFactors);
sleepRouter.get("/", getSleepData);

export default sleepRouter;
