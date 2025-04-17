import express from "express";
const app=express();

import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import BookRoute from "./routes/bookroutes.js"
import "dotenv/config"
import ReviewRoute from "./routes/reviewroutes.js"
import userRoute from "./routes/userroutes.js"

app.use(cors());

const port=process.env.port||process.env.PORT;
// middleware
app.use(bodyParser.json());

//Route



app.use("/api/auth",userRoute);
app.use("/api/book",BookRoute);
app.use("/api/review",ReviewRoute);


mongoose.connect(process.env.MONGO_DB_ATLAS,{
   

}).then(()=>{

    console.log("Database Connection is ready......")
}).catch((err)=>{
console.log(err)
})
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

