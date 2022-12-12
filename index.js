import express from 'express';
const app = express();
import cors from "cors";
//import  router  from "./modules/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "node:process"
dotenv.config({ silent: process.env });
// const PORT =  3000;
app.use(express.json());
app.use(cors());
//app.use("/",router);

app.get('/ping', (req,res)=>{
    res.send({
        "msg":"working"
    })
});

app.listen(process.env.port, () => 
mongoose.set("useFindAndModify", false),
mongoose
  .connect(process.env.moongoUrl)
  .then(() => {
    return console.log("connected to db")
  }
  ).catch(error => {
    throw error
  }),
console.log(`Server running on port ${process.env.port}}`));