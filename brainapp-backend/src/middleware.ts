import jwt from 'jsonwebtoken';
const JWT_SECRET:string=" userauthentication"

import { Request,Response,NextFunction } from 'express';



function authentication(req:Request,res:Response,next:NextFunction){
    const token:string=req.headers.token as string;
    const decodedId=jwt.verify(token,JWT_SECRET);
    //@ts-ignore
    if(decodedId){
         //@ts-ignore
        req.id =decodedId.id;
        next();
    }else{
        res.status(400).json({
            message:'invalid user'
        })
        return
    }
}

export default authentication;