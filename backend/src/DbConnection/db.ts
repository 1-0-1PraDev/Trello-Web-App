import mongoose from "mongoose";

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string, {});
        console.log('Database Connected');
    }catch(err){
        console.log(`Database Connection Error: `, err);
        process.exit(1);
    }
} 

export default connectDb;