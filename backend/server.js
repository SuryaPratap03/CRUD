import express from "express";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import dotenv from 'dotenv';
import UserRouter from "./routes/userRoute.js";
import Cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(Cors(
  {
    origin : ["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }
));

app.use('/api/users',UserRouter);
mongoose
  .connect(process.env.URI )
  .then(() => console.log("Database connectd"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT || 5000, (err) =>{
  if(err) console.log(err);
  console.log(`Server started at PORT:${PORT}`);
});
