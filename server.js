const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./db");
const cors = require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Body parser
app.use(express.json());
//Cookie parser
app.use(cookieParser());
// cors
app.use(cors())

connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/user", require("./routes/User"));
app.use("/api/category", require("./routes/Category"));
app.use("/api/product", require("./routes/Product"));
app.use('/api/payment', require('./routes/braintree'))

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}/`.bgBlue);
});
