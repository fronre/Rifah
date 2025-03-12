import { PORT } from "./config/env.js";
import express from "express";
import cors from "cors";
import mainRoute from "./routes/mainRouter.js";


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api',mainRoute);

app.listen(PORT,(err) => {
    if(err){
        console.log("Faild to start server");
    }else{
        console.log(`Server run on PORT ${PORT}`);
    }
});