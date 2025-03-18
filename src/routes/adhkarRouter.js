import { Router } from "express";
import adhkar from "../data/adhkar.json" assert { type: "json" };

const adhkarRouter = Router();

adhkarRouter.get("/", (req, res) => {
    res.json(adhkar);
});

adhkarRouter.get("/:type", (req, res) => {
    const { type } = req.params;
    
    if (!adhkar[type]) {
        return res.status(404).json({ message: "Type not found" });
    }

    res.json(adhkar[type]);
});

export default adhkarRouter;
