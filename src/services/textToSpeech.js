import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";

const client = new textToSpeech.TextToSpeechClient();

export const convertTextToSpeech = async (text) => {
    const request = {
        input: { text },
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    const filePath = `./audio/islamic-advice-${Date.now()}.mp3`;
    await writeFile(filePath, response.audioContent, "binary");

    return `https://yourserver.com/${filePath}`;
};
