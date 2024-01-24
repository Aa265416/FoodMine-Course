import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asynceHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";
const router = Router();

router.get(
  "/seed",
  asynceHandler(async (req, res) => {
    const UserCount = await UserModel.countDocuments();
    if (UserCount > 0) {
      res.send("Seed is already done");
      return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done!");
  })
);
router.post(
  "/login",
  asynceHandler(async (req, res) => {
    // const body = req.body;
    //gives json but express doesnt support json, need to enable it

    const { email, password } = req.body; //destructing the body by assigning email & password
    const user = await UserModel.findOne({ email, password });

    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("user name or password is invalid");
    }
  })
);

router.post("/register", asynceHandler(
  async(req, res)=>{
    const { name , email, password, address } = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
      return ;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser:User = {
      id:'',
      name,
      email:email.toLowerCase(),
      password:encryptedPassword,
      address,
      isAdmin:false
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser))
  }
))

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "Some random text",
    {
      expiresIn: "30d",
    }
  );

  user.token = token;
  return user;
};

export default router;
