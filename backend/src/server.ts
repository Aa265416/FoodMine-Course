import express from "express";
import cors from "cors";
import { sample_foods, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json()); //need to enable it as express doesnt support json
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sample_foods);
});
app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});
app.get("/api/foods/tags", (req, res) => {
  res.send(sample_tags);
});
app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});
app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sample_foods.find((food) => food.id == foodId);
  res.send(foods);
});

app.post("/api/users/login", (req, res) => {
  // const body = req.body;
  //gives json but express doesnt support json, need to enable it

  const { email, password } = req.body; //destructing the body by assigning email & password
  const user = sample_users.find(user => user.email === email && user.password === password);

    if(user){
        res.send(generateTokenResponse(user));
    }else{
        res.status(400).send("user name or password is invalid")
    }
});

const generateTokenResponse = (user:any)=>{
 const token = jwt.sign({
    email: user.email, isAdmin : user.isAdmin
 }, "Some random text",{
    expiresIn: "30d"
 });

 user.token = token;
 return user;
}

const port = 4000;
app.listen(port, () => {
  console.log("Website is served on http://localhost:" + port);
});
