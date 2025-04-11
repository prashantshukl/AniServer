import express from 'express';
import connectDB from './utils/mongodb.js';
import 'dotenv/config';

const app = express();

const port = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Server Running !!'));
connectDB();

app.listen(port, () => {
    console.log(`server listening on port : ${port}`);
})