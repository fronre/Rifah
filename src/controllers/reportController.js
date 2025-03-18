import prisma from "../config/db.js";
import generateAiDailyReport from "../utils/generateDailyReport.js";

export const generateDailyReport = async (req , res ) => {
    const dataId = req.params.dataId;
    const data = await prisma.sleepData.findUnique({
        where : {
            id : dataId
        },
        select : {
            date : true,
            sleep_data : true,
            sleep_experience : true,
            factors : true
        }
    });
    if(!data){
        res.status(404).json({
            ok : false,
            msg : "No data found"
        });
    }else {
        const report = await generateAiDailyReport(data);
        if(!report){
            res.status(r00).json({
                ok : false,
                msg : "Something went wrong"
            });
        }else{
            const dailyReport = await prisma.dailyReport.create({
                data : {
                    sleepDataId : dataId,
                    ...report
                }
            });
            res.status(201).json({
                ok : true,
                data : dailyReport
            });
        }
    }
}
export const getReport = async (req , res) => {
    const report = await prisma.dailyReport.findUnique({
        where : {
            id : req.params.id,
        }
    });
    if(!report){
        res.status(404).json({
            ok : false,
            data : "No report found"
        });
    }else{
        res.status(200).json({
            ok : true,
            data : report
        });
    }
}