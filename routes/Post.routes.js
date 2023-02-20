const express=require("express");
const {PostModel}=require("../model/Post.model");

const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    const notes=await PostModel.find()
    res.send(notes)
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const note=new PostModel(payload)
    await note.save()
    res.send({"msg":"Post Created"})
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id 
    const note = await PostModel.findOne({"_id":noteID})
    const userID_note=note.user
    const UserID_req=req.body.user
    try{
        if(UserID_req!==userID_note){
            console.log(UserID_req)
            console.log(userID_note)
            res.send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndDelete({_id:noteID})
            res.send({"msg":`Note with id: ${noteID} has been deleted`})
        }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const noteID=req.params.id 
    const note = await PostModel.findOne({"_id":noteID})
    const userID_note=note.user
    const UserID_req=req.body.user
    try{
        if(UserID_req!==userID_note){
            console.log(UserID_req)
            console.log(userID_note)
            res.send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({_id:noteID},payload)
            res.send({"msg":`Note with id: ${noteID} has been Updated`})
        }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
    
})

module.exports={
    postRouter
}