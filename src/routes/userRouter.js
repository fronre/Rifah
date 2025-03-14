import { Router } from "express";
import { authenticated, login, register } from "../controllers/userController.js";
import authenticatedMiddleware from "../middlewares/authenticated.js";
import { analyzeSleepData } from "../services/langchainService.js";

const userRoute = Router();

//register :
userRoute.post('/register', register);
//login : 
userRoute.post('/login', login);
//authenticated :
userRoute.get("/authenticated", authenticatedMiddleware, authenticated);
//analyze sleep:
userRoute.post('/analyze-sleep', async (req, res) => {
    try {
        const { sleepData } = req.body;
        const insights = await analyzeSleepData(sleepData);
        res.json({ insights });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default userRoute;