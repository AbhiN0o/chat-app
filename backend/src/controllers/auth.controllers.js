import bcrypt from "bcrypt"
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try {

        if(!fullName || !email || !password){
            return res.status(401).json({message:"All fields are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
      
        const user=await User.findOne({email})
        
        if(user) return res.status(400).json({message:"Email already exists"})

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

        if(newUser){
            //generate jwt token
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        }else{
            return res.status(400).json({message:"Invalid User Data"})
        }
        
    } catch (error) {
        console.log("Eroor in signup controller",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const login=(req,res)=>{
    res.send("login page")
}

export const logout=(req,res)=>{
    res.send("logout page")
}