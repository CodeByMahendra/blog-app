import mongoose from "mongoose";

export const connectDb = async()=>{
    console.log(process.env.MONGO_URL)
    try {
       await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb connected")
    } catch (error) {
        console.log("Not connected",error)
    }
}