import prisma from "../config/db.js";

// 1. جلب قائمة الأيام التي تتوفر بها بيانات نوم **للمستخدم الحالي فقط**
export const getAvailableDates = async (req, res) => {
    try {
        const dates = await prisma.sleepData.findMany({
            where: { userId: req.user.id }, // بيانات المستخدم الحالي فقط
            select: { id: true, date: true },
            orderBy: { date: "desc" },
        });
        res.status(200).json({ ok: true, data: dates });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving dates" });
    }
};

// 2. جلب تقرير يوم معين **للمستخدم الحالي فقط**
export const getDailyReport = async (req, res) => {
    try {
        const { dateId } = req.params;
        const report = await prisma.dailyReport.findFirst({
            where: { sleepDataId: dateId, sleepData: { userId: req.user.id } }, // التحقق من أن التقرير يخص المستخدم الحالي
        });
        if (!report) {
            return res.status(404).json({ ok: false, msg: "Report not found" });
        }
        res.status(200).json({ ok: true, data: report });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving report" });
    }
};

// 3. جلب ترتيب المستخدم **لكن يعرض فقط نقاط المستخدم المسجل**
export const getUserRanking = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, points: true },
            orderBy: { points: "desc" },
        });

        // البحث عن ترتيب المستخدم الحالي في القائمة
        const userIndex = users.findIndex(user => user.id === req.user.id);
        if (userIndex === -1) {
            return res.status(404).json({ ok: false, msg: "User not found in leaderboard" });
        }

        res.status(200).json({
            ok: true,
            rank: userIndex + 1, // الترتيب يبدأ من 1
            points: users[userIndex].points,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error retrieving user ranking" });
    }
};

// 4. تحديث نقاط المستخدم عند تنفيذ تحدٍّ معين
export const updatePoints = async (req, res) => {
    try {
        const { points } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: { points: { increment: points } }, // زيادة النقاط
        });

        res.status(200).json({
            ok: true,
            msg: "Points updated successfully",
            points: updatedUser.points,
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Error updating points" });
    }
};
