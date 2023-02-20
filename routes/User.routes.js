const express = require("express");
const {UserModel} = require("../model/User.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body
    const user = await UserModel.find({name,email});
    if(user.length>0){
        res.send({"msg":"User already exist, please login"})
    }else
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err) res.send({"msg":"Something went wrong", "Error":err.message})
            else{
                const user=new UserModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send({"msg":"New User has been registered"})
            }
        })
    }catch(err){
        res.send({"msg":"Something went wrong", "Error":err.message})
    }  
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"avinash")
                    res.send({"msg":"Logged In","token":token})
                }else{
                   
                    res.send({"msg":"Wrong Credentials"})
                }
            })
            
        }
    }catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})

module.exports={
    userRouter
}