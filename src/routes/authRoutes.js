import express from "express";
import {registerUser,getme} from "../controller/auth.controller.js";
import {Loginuser} from "../controller/auth.logincontroller.js";


const Router=express.Router()
Router.post("/register",registerUser);
Router.post("/login",Loginuser);
Router.get("/getme",getme);

export default Router; 