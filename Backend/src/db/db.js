import mongoose from "mongoose";


async function connectDB(){
    await mongoose.connect(process.env.MONGODB_URL);
    console.log( "connect db");
    

}
export default connectDB;

