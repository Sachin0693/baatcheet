import express from "express";
import {signUp,login,logOut} from "../controllers/auth.controller.js"

const authRouter = express.Router();

authRouter.post("/signUp",signUp)
authRouter.post("/login",login)
authRouter.get("/logOut",logOut)

export default authRouter