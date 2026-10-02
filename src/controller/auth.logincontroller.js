import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

 export async function Loginuser(req,res){
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                Message:"please provide email and password"
            })
        }
        const user=await UserModel.findOne({email: email.trim().toLowerCase(),});
        if(!user){
            return res.status(401).json({
                Message:"Invalid email or password"
            })
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                Message:"Invalid email or password"
            })
        }
        const token=jwt.sign({
            id:user._id,
        },config.JWT_SECRET,{
            expiresIn:"1h"
        })
        res.cookie("token",token)
         return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },token
    });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            Message:"internal server error"
        })
    }
}
