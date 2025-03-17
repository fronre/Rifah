import { Router } from "express";
import articles from "../data/articles.json" assert { type: "json" };

const articlesRouter = Router();

articlesRouter.get("/", (req, res) => {
    res.json(articles);
});

articlesRouter.get("/:id", (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) {
        return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
});

export default articlesRouter;
