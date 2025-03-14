import prisma from "../config/db.js";
import { convertTextToSpeech } from "./textToSpeech.js";

export const getIslamicAdvice = async (data) => {
    const { sleep_data, sleep_experience, factors } = data;

    let adviceText = "Reciting Ayat al-Kursi and Al-Mu'awwidhat before sleeping helps prevent nightmares.";
    if (factors.stress_level === "High") {
        adviceText += " Try to relax and perform Wudu before sleeping.";
    }

    const audioLink = await convertTextToSpeech(adviceText);

    const advice = await prisma.islamicAdvice.create({
        data: {
            advice_text: adviceText,
            audio_link: audioLink,
            sleepData: {
                connect: { id: sleep_data.id },
            },
        },
    });

    return { advice_text: adviceText, audio_link: audioLink };
};
