// import userModel from "../models/user.model.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt"; 

// export const authUser = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
//     if(!token){
//         return res.status(401).json({message: "Unauthorized"});
//     }

//     const isBlacklisted = await userModel.findOne({token: token});
//     if(isBlacklisted){
//         return res.status(401).json({message: "Unauthorized"});
//     }   

//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         req.user = user;
//         return next();

//     }catch(err){
//         return res.status(401).json({message: "Unauthorized"});
//     }

// }


import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

export const authUser = async (req, res, next) => {
    try {
        let token;

        // Check if token is in cookies
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } 
        // Else, check if token is in Authorization header
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // If token is still not present
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if token is blacklisted
        const isBlacklisted = await userModel.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        next();

    } catch (err) {
        console.error("Auth error:", err.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
