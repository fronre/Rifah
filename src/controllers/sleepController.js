import prisma from "../config/db.js";
import zodValidation from "../utils/zodValidation.js";
import { sleepDataSchema, sleepExperienceSchema, factorsSchema } from "../validation/sleep.js";

export const setSleepData = async (req, res) => {
    const validatedData = zodValidation(req.body, sleepDataSchema);
    if (!validatedData) {
        return res.status(400).json({ ok: false, msg: "Invalid sleep data" });
    }
    const sleepData = await prisma.sleepData.create({ data: validatedData });
    res.status(201).json({ ok: true, sleepData });
};

export const setSleepExperience = async (req, res) => {
    const validatedData = zodValidation(req.body, sleepExperienceSchema);
    if (!validatedData) {
        return res.status(400).json({ ok: false, msg: "Invalid sleep experience data" });
    }
    const sleepExperience = await prisma.sleepExperience.create({ data: validatedData });
    res.status(201).json({ ok: true, sleepExperience });
};

export const setFactors = async (req, res) => {
    const validatedData = zodValidation(req.body, factorsSchema);
    if (!validatedData) {
        return res.status(400).json({ ok: false, msg: "Invalid factors data" });
    }
    const factors = await prisma.factors.create({ data: validatedData });
    res.status(201).json({ ok: true, factors });
};

export const getSleepData = async (req, res) => {
    const sleepData = await prisma.sleepData.findMany();
    const sleepExperience = await prisma.sleepExperience.findMany();
    const factors = await prisma.factors.findMany();
    res.status(200).json({ ok: true, sleepData, sleepExperience, factors });
};
