import { PORT } from "./config/env.js";
import express from "express";
import cors from "cors";
import mainRoute from "./routes/mainRouter.js";
import sleepRouter from "./routes/sleepRoutes.js";
import islamicRouter from "./routes/islamic.js";
import islamicAdviceRouter from "./routes/islamicAdviceRouter.js";
import userRoute from "./routes/userRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', mainRoute);
app.use('/api/sleep', sleepRouter);
app.use('/api/islamic', islamicRouter);
app.use('/api/islamic-advice', islamicAdviceRouter);
app.use('/api/user', userRoute);

app.listen(PORT, (err) => {
    if (err) {
        console.log("Failed to start server");
    } else {
        console.log(`Server running on PORT ${PORT}`);
    }
});