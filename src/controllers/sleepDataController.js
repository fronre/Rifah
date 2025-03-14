import prisma from "../config/db";
import zodValidation from "../utils/zodValidation"
import { factorsSchema, initializeSleepDataSchema } from "../validation/sleep"

export const initializeSleepData = async (req, res) => {
    const validatedData = zodValidation(req.body, initializeSleepDataSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data",
        });
    } else {
        const date = new Date().toISOString().split("T")[0];
        try {
            const sleepData = await prisma.sleepData.create({
                data: {
                    date: date,
                    sleep_data: validatedData,
                    userId: req.userId
                },
                select: {
                    id: true
                }
            });
            res.status(201).json({
                ok: true,
                id: sleepData.id
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                msg: "Something went wrong"
            });
        }
    }
}
export const setSleepExperience = async (req, res) => {
    const validatedData = zodValidation(req.body, setSleepExperience);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data",
        });
    } else {
        try {
            const sleepData = await prisma.sleepData.update({
                where: {
                    id: req.params.id
                },
                data: {
                    sleep_experience: validatedData,
                },
                select: {
                    id: true
                }
            });
            res.status(204).json({
                ok: true,
                id: sleepData.id
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                msg: "Something went wrong"
            });
        }
    }
}

export const setFactors = async (req, res) => {
    const validatedData = zodValidation(req.body, factorsSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data",
        });
    } else {
        try {
            const sleepData = await prisma.sleepData.update({
                where: {
                    id: req.params.id
                },
                data: {
                    factors: validatedData
                },
                select: {
                    id: true
                }
            });
            res.status(204).json({
                ok: true,
                id: sleepData.id
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                msg: "Something went wrong"
            });
        }
    }
}