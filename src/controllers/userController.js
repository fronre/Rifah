import prisma from "../config/db.js";
import { comparePassword, hashPasswrod } from "../utils/bcryptHelper.js";
import { signToken } from "../utils/jwtHelper.js";
import zodValidation from "../utils/zodValidation.js";
import { newUserSchema } from "../validation/user.js";
import { analyzeSleepData } from "../services/langchainService.js";

export const register = async (req, res) => {
    try {
        const validatedData = zodValidation(req.body, newUserSchema);
        if (!validatedData) {
            return res.status(400).json({ ok: false, msg: "Invalid data" });
        }

        let user = await prisma.user.findUnique({ where: { username: validatedData.username } });
        if (user) {
            return res.status(400).json({ ok: false, msg: "This username is already in use" });
        }

        user = await prisma.user.create({
            data: {
                name: validatedData.name,
                username: validatedData.username,
                password: await hashPasswrod(validatedData.password)
            },
            select: {
                id: true,
            }
        });

        const token = signToken({ id: user.id }, 1000 * 60 * 60 * 24 * 5);
        const aiRecommendations = await analyzeSleepData(validatedData);

        res.status(201).json({
            ok: true,
            msg: "User registered successfully",
            token: token,
            aiRecommendations: aiRecommendations
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: error.message });
    }
};

export const login = async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(404).json({ ok: false, msg: "No credentials found" });
    }

    const user = await prisma.user.findUnique({ where: { username: data.username } });
    if (!user) {
        return res.status(404).json({ ok: false, msg: "No user found" });
    }

    if (!await comparePassword(data.password, user.password)) {
        return res.status(404).json({ ok: false, msg: "User name or password is wrong" });
    }

    const token = signToken({ id: user.id }, 1000 * 60 * 60 * 24 * 5);
    res.status(200).json({ ok: true, token: token });
};

export const authenticated = (req, res) => {
    res.status(200).json({ ok: true });
};