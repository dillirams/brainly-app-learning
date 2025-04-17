import mongoose from "mongoose";
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userSchema=new Schema({
    name:{type:String,unique:true},
    password:String
})

const contentSchema=new Schema({
    title:String,
    link:String,
    contenttype:{type:String},
    tags:[{type:ObjectId,ref:"tags"}],
    userId:{type:ObjectId,ref:"user"}
})

const tagSchema=new Schema({
    title:String
})

const linkSchema=new Schema({
    
    hash:String,
    userId:{type:ObjectId, ref:"user"}
})

export const userModel=mongoose.model("user",userSchema);
export const conntentModel=mongoose.model("content",contentSchema);
export const tagModel=mongoose.model('tags',tagSchema);
export const linkModel=mongoose.model('link',linkSchema);

