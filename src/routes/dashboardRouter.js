import { Router } from "express";
import authenticatedMiddleware from "../middlewares/authenticated.js";
import { getAvailableDates, getDailyReport, getUserRanking, updatePoints } from "../controllers/dashboardController.js";

const dashboardRouter = Router();

// الحصول على الأيام التي تحتوي على بيانات نوم **للمستخدم الحالي**
dashboardRouter.get("/dates", authenticatedMiddleware, getAvailableDates);

// الحصول على تقرير يوم معين **للمستخدم الحالي**
dashboardRouter.get("/report/:dateId", authenticatedMiddleware, getDailyReport);

// الحصول على ترتيب المستخدم المسجل فقط
dashboardRouter.get("/user-ranking", authenticatedMiddleware, getUserRanking);

// تحديث نقاط المستخدم عند تنفيذ تحدٍّ معين
dashboardRouter.put("/points", authenticatedMiddleware, updatePoints);

export default dashboardRouter;
