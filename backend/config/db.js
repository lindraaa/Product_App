import mongoose  from "mongoose"

//connecting to mongdb atlas
export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGOURL);
        console.log(`Succesfull connected to Database: ${conn.connection.host}`);
    }catch(err){
        console.log(`Error connecting  ${err}`)
        process.exit(1) // 1 means exit with failure 0 means success
    }
}