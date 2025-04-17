import { Router } from "express";
import zod from 'zod'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken';
const JWT_SECRET:string=" userauthentication"


import { conntentModel, linkModel, userModel } from "./db";
import errorMap from "zod/lib/locales/en";
import authentication from "./middleware";
import { hashLink } from "./util";
const userRouter:Router=Router();

const requestBody=zod.object({
    name:zod.string().min(3,{message:"the minimum length is 3"}),
    password:zod.string().min(4,{message:"min 4"}).max(8,{message:"max length of 8"})
})

userRouter.post('/signup',async(req,res)=>{
    const {name, password}=req.body;
    const inputValidation=requestBody.safeParse(req.body);
    if(!inputValidation.success){
        res.status(400).json({
            message:"invalid input format",
            error:inputValidation.error
        })
        return
    }
const user=await userModel.findOne({
    name:name
})
if(user){
    res.status(300).json({
        message:"user already exsit"
    })
    return
}

const hasedPassword:string=await bcrypt.hash(password,5);
await userModel.create({
    name:name,
    password:hasedPassword
})
res.status(200).json({
    message:"you signed up successfully"
})

  
})


type InputType=zod.infer<typeof requestBody>


userRouter.post('/signin',async(req,res)=>{

    const {name,password}:InputType=req.body;
    const user=await userModel.findOne({
        name:name,
    })
    if(!user){
        res.status(400).json({
            message:"user doesnt exsit, please signup"
        })
        return
    }
   
    
    const decodedPassword=await bcrypt.compare(password,user.password as string);

    if(decodedPassword){
        const token= jwt.sign({
            id:user._id
        },JWT_SECRET)
    res.status(200).json({
        message:"you are  signed in",
        token:token
    })
    }else{
        res.status(400).json({
            message:"invalid password"
        })
    }




})

type ContentType={
    title:string,
    link:string,
    contenttype:string
}

userRouter.post('/content',authentication,async(req,res)=>{
    //@ts-ignore
    const userId=req.id ;
    const user= await userModel.findOne({
        _id:userId
    })
    if(!user){
        res.status(411).json({
            message:"you are not logedin"
        })
        return
    }
    const {title,link, contenttype}:ContentType=req.body;
    await conntentModel.create({
        title:title,
        link:link,
        contenttype:contenttype,
        userId:userId
    })
    res.status(200).json({
        message:"content created successfully"
    })


})

userRouter.get('/content',authentication, async(req,res)=>{
    //@ts-ignore
    const userId=req.id;
    const content=await conntentModel.find({
        userId:userId
    }).populate("userId");
    if(content){
        res.status(200).json({
            content
        })
    }else{
        res.status(411).json({
            message:"you are not signed up"
        })
    }



})
userRouter.delete('/content',authentication, async(req,res)=>{
    //@ts-ignore
    const contentId=req.body.contentId;
    //@ts-ignore
    const userId=req.id;
    try{
        await conntentModel.deleteOne({
            _id:contentId,
            userId:userId
        })
        res.status(200).json({
            message:"content deleted successfully"
        })
    }catch(e){
        res.status(400).json({
            message:"couldnt delete the content"
        })
        return
    }
    

})

type LinkType={
    share:boolean
}

userRouter.post('/share',authentication,async(req,res)=>{
    const {share}:LinkType=req.body

    const linkPresent=await linkModel.findOne({
        //@ts-ignore
        userId:req.id
    })
    if(share&&linkPresent?.hash){
        res.status(200).json({
            message:"the shared link is",
            link:linkPresent.hash
        })
        return
    }

    else if(share && (!linkPresent?.hash)){
        const hashString=hashLink(10);
        await linkModel.create({
           
            hash:hashString,
             //@ts-ignore
            userId:req.id
        })
        res.status(200).json({
            message:"shared link is",
            link:hashString
        })
        return
        
    }else{
        await linkModel.deleteOne({
            //@ts-ignore
            userId:req.id
        })
        res.status(200).json({
            message:"link deleted successfully"
        })
        return
    }
})

userRouter.get('/share',async(req,res)=>{
    //@ts-ignore
    const {hash}:string=req.body
    
    const link=await linkModel.findOne({
        hash:hash
    })
    if(!link){
        res.status(411).json({
            message:"no link found"
        })
        return
    }
    const user=await userModel.findOne({
        _id:link.userId
    })
    const content=await conntentModel.find({
        userId:link.userId
    })

    res.status(200).json({
        //@ts-ignore
        user:user._id,

        message:"the content is",
        content:content
    })

})

export default userRouter




