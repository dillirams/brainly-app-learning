import express from 'express'
import mongoose from 'mongoose'
import { userRouter } from './router';
import cors from 'cors'


const app=express();
app.use(express.json());
app.use(cors())
app.use('/user',userRouter)


async function main(){
    await mongoose.connect("mongodb+srv://root:dilli03@cluster0.zuems.mongodb.net/brainly-practice")
    app.listen(3000,()=>{
        console.log("the app is listening to port 3000")
    })
}

main();
