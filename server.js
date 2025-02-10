import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import route from './routes/userRoute.js';

const app = express();

//middlewares
app.use(express.json())
app.use(cors({credentials:true}))
app.use(bodyParser.json())
app.use(cookieParser())
dotenv.config();

//db connection
connectDB();


const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`Server running on PORT:${port}`);
    
})

app.use('/api', route)