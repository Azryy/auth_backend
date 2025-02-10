import mongoose from "mongoose";
import dotenv from 'dotenv'
const connectDB = async()=>{
    
    
    await mongoose.connect(`${process.env.MONGODB_URI}`).then(()=>console.log("db connected successfully"))
    .catch(error=>console.error(error));
    
}

export default connectDB