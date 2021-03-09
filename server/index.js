import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

// const express = require('express')
const app = express();
dotenv.config();

//general setup 
app.use(bodyParser.json({limit : "30mb", extended: true})); 
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());

//middleware
app.use('/posts', postRoutes);
app.use('/users', userRoutes);


app.get('/', (req, res) => {
  res.send('Hello to social media API')
})

//mongoDB
// const CONNECTION_URL = 'mongodb+srv://zoemengdb:521mljB2Y@cluster0.vs9yo.mongodb.net/<dbname>?retryWrites=true&w=majority';
const POST = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(POST, () => console.log(`Server starting on post: ${POST}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

