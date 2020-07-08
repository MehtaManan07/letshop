const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
},() => {
    console.log(`mongo connected`.bgGreen)
});

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  //Routes
app.use('/api/users/', require('./routes/Users'))

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}/`.bgBlue)
})