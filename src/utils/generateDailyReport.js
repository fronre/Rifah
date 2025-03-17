import { ChatPromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import llm from "../services/googleGenAi.js";
import { dailyReportSchema } from "../validation/dailyReport.js";

const generateAiDailyReport = async (jsonData) => {
    const outputParser = StructuredOutputParser.fromZodSchema(dailyReportSchema);

    const promptTemplate = ChatPromptTemplate.fromMessages([
        HumanMessagePromptTemplate.fromTemplate(
            `أنت خبير في النوم. قم بتحليل بيانات النوم التالية وأعد تقريرًا بصيغة JSON فقط، مع استخدام **المفاتيح باللغة الإنجليزية** والقيم باللغة العربية.

            يجب أن يتبع التقرير القواعد التالية:
            - **لا تضف أي نصوص أخرى خارج JSON**.
            - **المخرجات يجب أن تتبع هذا التنسيق بدقة:** {format_instructions}

            بيانات النوم:
            {jsonData}`
        ),
    ]);

    const chain = promptTemplate.pipe(llm).pipe(outputParser);

    try {
        const report = await chain.invoke({
            format_instructions: outputParser.getFormatInstructions(),
            jsonData: JSON.stringify(jsonData),
        });
        return report;
    } catch (error) {
        return null;
    }
};



export default generateAiDailyReport;
