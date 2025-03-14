import { PORT } from "./config/env.js";
import express from "express";
import cors from "cors";
import mainRoute from "./routes/mainRouter.js";
import sleepRouter from "./routes/sleepRoutes.js";
import islamicRouter from "./routes/islamic.js";
import islamicAdviceRouter from "./routes/islamicAdviceRouter.js";
import userRoute from "./routes/userRouter.js";
import { getLlama3Response } from "./services/service.js"; // Updated import

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', mainRoute);
app.use('/api/sleep', sleepRouter);
app.use('/api/islamic', islamicRouter);
app.use('/api/islamic-advice', islamicAdviceRouter);
app.use('/api/user', userRoute);

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await getLlama3Response(prompt);
        res.json(response);
    } catch (error) {
        res.status(500).send('Error generating response');
    }
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Failed to start server");
    } else {
        console.log(`Server running on PORT ${PORT}`);
    }
});
