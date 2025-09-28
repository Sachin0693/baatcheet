import mongoose from "mongoose"

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected");
    }catch(error){
        console.log("error DB");
    }
}

export default connectDB;