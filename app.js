import express from "express";
import mongoose from "mongoose";
import bookRouter from "./routes/book-routes";
import router from "./routes/user-routes";


//app will get all the functionalities from express
const app = express();
app.use(express.json());//to send the json values from front end
app.use("/api/book",bookRouter);
app.use("/api/user", router);

mongoose.connect('mongodb+srv://saisilesh:YuVduvEAA2KooiCd@cluster0.5vbm05u.mongodb.net/Books?retryWrites=true&w=majority')
.then(()=>app.listen(process.env.PORT || 3000)).then(()=>console.log("Connected and Listening on 3000")).catch((err)=>console.log(err));