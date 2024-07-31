import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';    
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import connectDb from './DbConnection/db';
import userRouter from './routes/authRoutes';
import taskRouter from './routes/taskRoutes';

// Configure the dot.env 
dotenv.config();

const app = express();  
const PORT = process.env.PORT;  

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// process.env.FRONTEND_URL,
// Essential middleware
app.use(cors({
    origin: "https://ephemeral-semifreddo-1bc0e7.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/task', taskRouter);


// Establish Database connection
connectDb();

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

