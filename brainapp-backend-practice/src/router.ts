
import { Router } from "express";
import zod, { string } from 'zod'
import bcrypt from 'bcrypt'
import { contentModel, userModel } from "./db";

import jwt from 'jsonwebtoken'
import { authtentication } from "./middleware";
const JWT_SECRET="jajalkjfaldjjkfgdhajk"


export const userRouter=Router();

const userInput=zod.object({
    name:string().min(4).max(10),
    email:string().email(),
    password:string()
})

userRouter.post('/signup',async (req,res)=>{
    
const {name, email, password}=req.body;
const inputValidation=userInput.safeParse(req.body);
if(!inputValidation.success){
    res.status(400).json({
        message:"invalid input format",
        error:inputValidation.error
    })
    return
}
const userAlreadyPresent=await userModel.findOne({
    name:name
})
if(userAlreadyPresent){
    res.status(300).json({
        message:"user already exist",

    })
    return
}
const hashPassword=await bcrypt.hash(password,5)
await userModel.create({
    name:name,
    email:email,
    password:hashPassword
  })
  
res.status(200).json({
    message:"you signedup successfully"
})

})

type SigninInput=zod.infer<typeof userInput>

userRouter.post('/signin',async(req,res)=>{
    const {name,email, password}:SigninInput=req.body;
    const user=await userModel.findOne({
        name:name,
        email:email
    })
    if(!user){
        res.json(400).json({
            message:"user doesnt exist"
        })
        return
    }
    const decodedPassword=await bcrypt.compare(password,user.password as string);
    if(!decodedPassword){
        res.status(400).json({
            message:"invalid password"
        })
        return
    }else{
        const token=jwt.sign({
            id:user._id
        },JWT_SECRET)
        res.status(200).json({
            message:"you signin successfully",
            token:token
        })
    }

})

type ContentType={
    title:string,
    link:string,
    type:string
}

userRouter.post('/content',authtentication, async(req,res)=>{
    //@ts-ignore
    const userId=req.id;
    const user=await userModel.findOne({
        _id:userId
    })
    if(!user){
        res.status(400).json({
            message:"user is not logedin"
        })
        return
    }else{
        const {title, link, type}:ContentType=req.body;
        await contentModel.create({
            title:title,
            link:link,
            type:type,
            userId:userId
        })
        res.status(200).json({
            message:"content created successfully"
        })
    }
    
})

userRouter.get('/content',authtentication, async(req,res)=>{
    //@ts-ignore
    const userId=req.id;
    const user=await userModel.findOne({
        _id:userId
    })
    if(!user){
        res.status(400).json({
            message:"user not logedin"
        })
        return
    }else{
        const content=await contentModel.find({
            userId:userId
        })
        res.status(200).json({
            message:"your content is",
            content:content
        })
    }
    
})

userRouter.delete('/content',authtentication,async(req,res)=>{
    //@ts-ignore
    const userId=req.id;
})