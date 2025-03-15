import { z } from "zod";


export const dailyReportSchema = z.object({
    summary: z.string().describe("تحليل شامل لجودة النوم بناءً على البيانات المقدمة، يشمل تفاصيل مثل مدة النوم، مدى استمراريته، عدد مرات الاستيقاظ، وأي عوامل خارجية أثرت عليه."),
    
    rating: z.number().int().describe("تقييم شامل لجودة تجربة النوم من 0 إلى 100 بناءً على مدة النوم، الراحة، الاستيقاظات المتكررة، ومستوى الطاقة عند الاستيقاظ."),
    
    total_sleep_duration: z.string().describe("إجمالي عدد ساعات ودقائق النوم، مع الأخذ في الاعتبار الفترات التي تم الاستيقاظ فيها أثناء الليل."),
    
    sleep_problems: z.array(z.string()).describe("تحليل متعمق لمشاكل النوم التي تم رصدها، مثل الأرق، النوم المتقطع، الكوابيس، الاستيقاظ المتكرر، وصعوبة النوم، مع شرح تأثير كل منها على جودة النوم والصحة العامة."),
    
    recommendations: z.array(z.string()).describe("قائمة مفصلة من التوصيات العلمية والممارسات الصحية لتحسين جودة النوم، تتضمن نصائح حول تقليل التوتر، تحسين بيئة النوم، تقليل التعرض للضوء الأزرق، وتعديل عادات ما قبل النوم.")
});
