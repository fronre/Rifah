import prisma from "../config/db.js";
import { comparePassword, hashPasswrod } from "../utils/bcryptHelper.js";
import { signToken } from "../utils/jwtHelper.js";
import zodValidation from "../utils/zodValidation.js"
import { newUserSchema } from "../validation/user.js"

export const register = async (req, res) => {
    const validatedData = zodValidation(req.body, newUserSchema);
    if (!validatedData) {
        res.status(400).json({
            ok: false,
            msg: "Invalid data",
        });
    } else {
        let user = await prisma.user.findUnique(({ where: { username: validatedData.username } }));
        if (user) {
            res.status(400).json({
                ok: false,
                msg: "This username is already in used",
            });
        } else {
            user = await prisma.user.create({
                data: {
                    name: validatedData.name,
                    username: validatedData.username,
                    password: await hashPasswrod(validatedData.password),
                    age : validatedData.age
                },
                select: {
                    id: true,
                }
            });
            const token = signToken({ id: user.id }, 1000 * 60 * 60 * 24 * 5);
            res.status(201).json({
                ok: true,
                msg: "User registred successfully",
                token: token
            });
        }
    }
}

export const login = async (req, res) => {
    const data = req.body;
    if (!data) {
        res.status(404).json({
            ok: false,
            msg: "No credentials found",
        });
    } else {
        const user = await prisma.user.findUnique({
            where: {
                username: data.username
            }
        });
        if (!user) {
            res.status(404).json({
                ok: false,
                msg: "No user found",
            });
        } else {
            if (!await comparePassword(data.password, user.password)) {
                res.status(404).json({
                    ok: false,
                    msg: "User name or password is wrong",
                });
            } else {
                const token = signToken({ id: user.id }, 1000 * 60 * 60 * 24 * 5);
                res.status(200).json({
                    ok: true,
                    token: token,
                });
            }
        }
    }
}

export const authenticated = (req,res) => {
    res.status(200).json({
        ok :true,
    });
}