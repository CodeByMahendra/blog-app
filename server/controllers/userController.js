import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

 export const register = async(req,res)=>{
    try {
        const {fullName,email,username,password}= req.body;
        if(!email || !username || !password ||!fullName){
            return res.status(401).json({message:"All fields are required",success:false})

        }
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({message:"These email is already registered try diffrent",success:false})

        }
        const hashedPassword = await bcrypt.hash(password,10)
        const userDetails = await new User({username,email,password:hashedPassword})

        const userData =await userDetails.save();

        return res.status(200).json({message:"User register successfully" , success:true, userData,user})
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find({});
        return res.status(200).json({message:"All users",usercount:users.length,success:true,users})
    } catch (error) {
        console.log(error)
    }
}


export const login = async (req,res)=>{
    try {
        const {email,password}= req.body;
        if(!email  || !password){
            return res.status(401).json({message:"All fields are required",success:false})

        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"please correct email or password",success:false})

        }
        const comparePassword = await bcrypt.compare(password,user.password);
        console.log("comparePassword=",comparePassword)
        if(!comparePassword){
            return res.status(401).json({message:"your password is incorrect",success:false})

        }
        const tokenData = {
            userId : user._id
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY, {expiresIn:'2d' })

        console.log(token)

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            username:user.username,
            token,
            user
        })

        
    } catch (error) {
        console.log(error)
    }
}


export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}