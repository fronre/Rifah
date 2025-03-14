import { LLMChain } from "langchain";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const model = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY, 
    modelName: "gpt-3.5-turbo", // أو "gpt-4" إذا كان متاحًا
    temperature: 0.7 // تحكم في الإبداعية (0 = أكثر تحفظًا، 1 = أكثر تنوعًا)
});

export const analyzeSleepData = async (sleepData) => {
    const promptTemplate = new PromptTemplate({
        template: `You are a sleep expert. Analyze the following sleep data and provide detailed insights, highlighting any potential issues and recommendations:\n\n{sleepData}`,
        inputVariables: ["sleepData"]
    });

    const chain = new LLMChain({
        llm: model,
        prompt: promptTemplate
    });

    try {
        const insights = await chain.run({ sleepData: JSON.stringify(sleepData, null, 2) });
        return insights;
    } catch (error) {
        console.error("Error analyzing sleep data:", error);
        return "Failed to analyze sleep data.";
    }
};
