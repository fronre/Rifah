import prisma from "../config/db.js";
export const getDates = async (req ,res ) => {
    const dates = await prisma.sleepData.findMany({
        where : {
            userId : req.userId
        },
        select : {
            id : true,
            date : true
        }
    });
    if(!dates){
        res.status(404).json({
            ok : false,
            data : "No dates found"
        });
    }else{
        res.status(200).json({
            ok : true,
            data : dates
        });
    }
} 