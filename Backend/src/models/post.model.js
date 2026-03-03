import mongoose from "mongoose";

const postschema  = new mongoose.Schema({
     image : {type:String,required:true},
     caption : {type:String,required:true},
})

const postmodel = mongoose.model("post",postschema);

export default postmodel;