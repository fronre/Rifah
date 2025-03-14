import { getIslamicAdvice } from "../services/islamicAdviceService.js";
import zodValidation from "../utils/zodValidation.js";
import { islamicAdviceSchema } from "../validation/islamicAdvice.js";

export const fetchIslamicAdvice = async (req, res) => {
    const validatedData = zodValidation(req.body, islamicAdviceSchema);
    if (!validatedData) {
        return res.status(400).json({ ok: false, msg: "Invalid data" });
    }
    try {
        const advice = await getIslamicAdvice(validatedData);
        res.status(200).json({ ok: true, advice });
    } catch (error) {
        res.status(500).json({ ok: false, msg: "Failed to fetch Islamic advice" });
    }
};
