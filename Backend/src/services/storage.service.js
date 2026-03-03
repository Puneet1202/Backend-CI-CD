 import ImageKit from '@imagekit/nodejs'; 
 

 const imageKit = new ImageKit({
    privateKey :   process.env.IMAGEKIT_PRIVATE_KEY 

 })

 async function uploadFile(buffer ){
    if(!buffer){
        return {
            status:"error",
            message:"No file uploaded"
        }
       
    }
     console.log("Buffer size:", buffer.length)

    const result = await imageKit.files.upload({
        file : buffer.toString('base64'),
        fileName : "image.jpg"
    })

    return result;

 }
  
    export default uploadFile;
