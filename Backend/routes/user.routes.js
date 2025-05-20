import express from "express";
const router = express.Router();
import {body} from 'express-validator';

import * as userController from '../controllers/user.controller.js';
import {authUser} from "../middlewares/auth.middleware.js";



router.post("/register",[
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullname.firstname").isLength({min:3}).withMessage("First Name should be at least 3 characters long"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long"),
], userController.registerUser
);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({min:6}).withMessage("Password should be at least 6 characters long"),
],userController.loginUser
);

router.get("/profile",authUser, userController.getUserProfile);
router.get("/logout", authUser, userController.logoutUser);


export default router;