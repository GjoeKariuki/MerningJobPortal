const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");

// import routes
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
// 
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// 
// mongodb+srv://githaigageorge96:pxGA0v9qMFzpr54y@jobportalapi.fxpxqew.mongodb.net/?retryWrites=true&w=majority&appName=jobportalapi
mongoose.connect(`mongodb+srv://githaigageorge96:pxGA0v9qMFzpr54y@jobportalapi.fxpxqew.mongodb.net/?retryWrites=true&w=majority`, {})
.then(() => console.log("DB connected"))
.catch((err) => console.log(err))

// middlewate

app.use(morgan('dev'))
app.use(bodyParser.json({limit: "5mb"}))
app.use(bodyParser.urlencoded({limit:"5mb",extended:true}));
app.use(cookieParser());
app.use(cors());

// routers middleware
// app.get("/", (req,res) => {
//   res.send("Hello from node js");
// })
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// custom errors
app.use(errorHandler);

const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});

