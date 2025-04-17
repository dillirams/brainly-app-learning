import {Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
const JWT_SECRET="jajalkjfaldjjkfgdhajk"



export function authtentication(req:Request,res:Response,next:NextFunction){
    const token:string=req.headers.token as string;
    const decodedToken=jwt.verify(token,JWT_SECRET);

    if(decodedToken){
        //@ts-ignore
        req.id=decodedToken.id;
        next();
    }else{
        //ts-ignore
       res.status(400).json({
        message:"invalid user"
       })
        return
    }
}