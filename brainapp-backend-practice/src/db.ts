import mongoose from 'mongoose'
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:String,
    email:String,
    password:String
})

const contentSchema=new Schema({
    title:String,
    link:String,
    type:String,
    userId:{type:mongoose.Schema.ObjectId, ref:"user" },


})

const linkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Schema.ObjectId, ref:'user'}
})

const tagSchema=new Schema({
    title:String

})

export const userModel=mongoose.model('user',userSchema);
export const contentModel=mongoose.model('content',contentSchema);
export const linkModel=mongoose.model('link',linkSchema);
export const tagModel=mongoose.model('tags',tagSchema)

