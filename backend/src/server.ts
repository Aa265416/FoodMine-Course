import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import { dbConnect } from './configs/database.config';

dbConnect();
const app = express();



app.use(express.json()); //need to enable it as express doesnt support json
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/foods" , foodRouter);
app.use("/api/users", userRouter);

const port = 4000;
app.listen(port, () => {
  console.log("Website is served on http://localhost:" + port);
});
