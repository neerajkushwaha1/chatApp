import User from "../models/userModel.js"

import bcryptjs from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateTokens.js"
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    console.log(req.body);
    // Validate required fields
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "username already exists" });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Set profile picture
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Save user and generate token
    await newUser.save();
    await generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signUp controller:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout=(req, res)=>{
    try{
        res.cookie("jwt","", {maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }
    catch(error){
        console.log("Error in login controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const login= async (req, res)=>{
    try{
        const {username, password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect =  await bcryptjs.compare(password, user?.password || "")
        if(!isPasswordCorrect || !user){
            return res.status(400).json({error: "Invalid password"});
        }

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        })
    }
    catch(error){
        console.log("Error in login controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}


// const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
// const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`
