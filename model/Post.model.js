const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_if_comments:Number,
    user:String
})

const PostModel=mongoose.model("post",postSchema)

module.exports={
    PostModel
}

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2YzNDRjZjA2OWJmYWE4NDExOGVmYWUiLCJpYXQiOjE2NzY4ODgxOTJ9.GLmcYsqYZP-X2N0YooxGD43VIbTXrVp2laF0w0qTeOY */