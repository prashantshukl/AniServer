import express from 'express';
import connectDB from './utils/mongodb.js';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';


// Route Imports
import authRouter from './routes/authRouter.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Server Running !!'));


connectDB();
app.use('/api/v1/auth', authRouter);



app.listen(port, () => {
    console.log(`server listening on port : ${port}`);
})