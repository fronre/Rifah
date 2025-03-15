import prisma from "../config/db.js";
import zodValidation from "../utils/zodValidation.js"
import { factorsSchema, initializeSleepDataSchema ,sleepExperienceSchema} from "../validation/sleep.js"

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
            await prisma.agenda.create({
                data : {
                    date : date,
                    userId : req.userId
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
    const validatedData = zodValidation(req.body, sleepExperienceSchema);
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
            res.status(200).json({
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
            res.status(200).json({
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

export const getSleepData = async (req , res) => {
    const data = await prisma.sleepData.findUnique({
        where : {
            id : req.params.id
        },
    });
    if(!data){
        res.status(404).json({
            ok : false,
            msg : "No data found"
        });
    }else{
        res.status(200).json({
            ok : true,
            data : data
        });
    }
}