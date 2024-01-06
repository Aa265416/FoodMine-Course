import { Router } from "express";
import { sample_users } from "../data";
import  jwt  from "jsonwebtoken";
import asynceHandler from "express-async-handler";
import { UserModel } from "../models/user.model";


const router = Router();

router.get("/seed", asynceHandler(
    async(req, res)=>{
      const UserCount = await UserModel.countDocuments();
      if(UserCount > 0){
        res.send("Seed is already done");
        return;
      }
      await UserModel.create(sample_users);
      res.send("Seed is done!")
    }
  ));
router.post("/login", asynceHandler(
   async (req, res) => {
        // const body = req.body;
        //gives json but express doesnt support json, need to enable it
      
        const { email, password } = req.body; //destructing the body by assigning email & password
        const user = await UserModel.findOne({email , password});
      
          if(user){
              res.send(generateTokenResponse(user));
          }else{
              res.status(400).send("user name or password is invalid")
          }
      }
));
  
  const generateTokenResponse = (user:any)=>{
   const token = jwt.sign({
      email: user.email, isAdmin : user.isAdmin
   }, "Some random text",{
      expiresIn: "30d"
   });
  
   user.token = token;
   return user;
  }

  export default router;