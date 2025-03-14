import { Router } from "express";
import { fetchIslamicAdvice } from "../controllers/islamicAdviceController.js";

const islamicAdviceRouter = Router();

islamicAdviceRouter.post("/advice", fetchIslamicAdvice);

export default islamicAdviceRouter;
