import { convertTextToSpeech } from "./textToSpeech.js";

export const getIslamicAdvice = async (req, res) => {
    try {
        const { sleep_data, sleep_experience, factors } = req.body;

        let advice = "Reciting Ayat al-Kursi and Al-Mu'awwidhat before sleeping helps prevent nightmares.";
        if (factors.stress_level === "High") {
            advice += " Try to relax and perform Wudu before sleeping.";
        }

        const audioUrl = await convertTextToSpeech(advice);

        res.status(200).json({
            ok: true,
            advice,
            audio_url: audioUrl,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Failed to generate Islamic advice",
        });
    }
};
