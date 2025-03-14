import { Router } from "express";
import { getIslamicAdvice } from "../services/islamicService.js";

const islamicRouter = Router();

islamicRouter.post("/advice", getIslamicAdvice);

export default islamicRouter;
