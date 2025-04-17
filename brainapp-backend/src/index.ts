import express from 'express'
import mongoose from 'mongoose';

import cors from 'cors'

import userRouter from './route'


const app=express();

app.use(express.json())
app.use(cors())

app.use('/user',userRouter)


async function main(){
    await mongoose.connect('mongodb+srv://root:dilli03@cluster0.zuems.mongodb.net/brain-app')
    app.listen(3000,()=>{
        console.log("the server is listening to port 3000")
    })
}
main();

