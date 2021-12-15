const express = require('express');
require('dotenv').config();
const dbConnection = require('./configuration/mongoConfig.js');
const authRouter = require('./routes/auth/auth.router');
const movieRouter = require('./routes/movie/movie.router');

const uploadFile = require('./helpers/aws.upload');

const app = express();

//uploadFile("D:/Photo/SPNWH.jpg");

app.use(express.json({extended: true}));

app.use('/api/auth', authRouter);
app.use('/api/movie', movieRouter);

dbConnection();

app.listen(process.env.PORT, () => console.log(`Server has been started on PORT: ${process.env.PORT}`));
