import { verifyToken } from "../utils/jwtHelper.js";

const authenticatedMiddleware = (req , res , next) => {
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({
            ok : false,
            msg : "UNAUTHORIZED"
        });
    }else{
        const payload = verifyToken(token);
        if(!payload){
            res.status(401).json({
                ok : false,
                msg : "UNAUTHORIZED"
            });
        }else{
            req.userId = payload.id;
            next()
        }
    }
}
export default authenticatedMiddleware;