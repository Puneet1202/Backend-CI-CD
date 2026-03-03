 import express  from 'express';
 import multer from 'multer';  
import uploadFile from  './services/storage.service.js';
import postModel from './models/post.model.js';
import { isValidObjectId } from 'mongoose';
import postmodel from './models/post.model.js';
import cors from 'cors';


 const app = express();
 app.use(cors());

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

  const upload = multer({storage:multer.memoryStorage()});

 app.post('/create-post',upload.single('image'),async (req,res)=>{

    console.log( "Body:",req.body);
    console.log( "req.file:",req.file);

    const result = await uploadFile(req.file.buffer);
    console.log( result.url);

    const post = await  postModel.create({
      image : result.url,
      caption : req.body.caption
    }) 
    console.log(  "Post created:",post);
    return res.status(201).json({
      message:"post created successfully",
      image:post.image,
      caption:post.caption
    });  
   
 })

  app.get('/showAll-post', async(req,res)=>{
   const posts = await postModel.find();

   if(posts.length === 0){
      return res.status(404).json({
         message:"No post found"

      })
   }
   return res.status(200).json({
      message:"Posts found",
      posts:posts
   });
       
 })

 app.get('/show-post/:id',async(req,res)=>{

   const{id}=req.params;

   if(!isValidObjectId(id)){
      return res.status(400).json({
         status:"failed",
         message:"Invalid post id"
      })
   }

   const post = await postmodel.findById(id)

   if(!post){
      return res.status(404).json({
         status:"failed",
         message:"Post not found"
      })
   }


   return res.status(200).json({
      status:"success",
      post:post
   })
   
 })

 app.delete('/deleteALL-post',async(req,res)=>{
  const deleted = await postModel.deleteMany();
  if( deleted.deletedCount == 0){
   return res.json({
      message:"No post to delete"
   })
  }
  return res.status(200).json({
    message:"All posts deleted",
    deleted:deleted
  })
 })

 app.delete('/delete-post/:id',async(req,res)=>{

   const{id}=req.params;

   if(!isValidObjectId(id)){
      return res.status(400).json({
         status:"failed",
         message:"Invalid post id"
      })
   }

   const deleted = await postModel.findByIdAndDelete(id);

   if(!deleted){
      return res.status(404).json({
         status:"failed",
         message:"Post not found"
      })
   }

   return res.status(200).json({
      status:"success",
      message:"Post deleted successfully"
   })

   
 })
app.put('/update-post/:id', upload.single('image'), async (req, res, next) => {
   try {
      const { id } = req.params;
      const { caption } = req.body;

      if (!isValidObjectId(id)) {
         return res.status(400).json({ status: "failed", message: "Invalid post id" });
      }

      // 1. Image handling thoda saaf karo
      let imageUrl;
      if (req.file) {
         const result = await uploadFile(req.file.buffer);
         imageUrl = result.url; // <-- Yahan .url lena zaroori hai
      }

      // 2. Database Update
      const post = await postModel.findByIdAndUpdate(id,
         {
            caption: caption,
            // Agar imageUrl hai toh naya dalo, warna purana hi rehne do
            ...(imageUrl && { image: imageUrl }) 
         },
         { new: true }
      );

      if (!post) {
         return res.status(404).json({
            status: "failed",
            message: "Post database se chali gayi hai ya delete ho chuki hai!"
         });
      }

      // 3. Success Response (Ye aapne miss kiya tha)
      return res.status(200).json({
         status: "success",
         message: "Post updated successfully",
         post: post
      });

   } catch (err) {
      // Ye line aapke Global Error Handler ko trigger karegi
      next(err); 
   }
});

// Ye line saare app.get/app.post ke niche honi chahiye
app.use((req, res) => {
    res.status(404).json({
        status: "failed",
        message: "Bhai, ye wala route (URL) mere paas nahi hai. URL check karo!"
    });
});

app.use((err,req,res,next)=>{
  console.error("🚨 Error occurred:", err.stack);

  const  statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
   stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});   


 export default app;