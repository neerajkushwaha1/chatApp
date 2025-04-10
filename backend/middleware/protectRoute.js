import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protectRoute = async (req, res, next) => {
    try{
        const token =req.cookies.jwt
        // const token = req.cookies['auth-token']; 
        console.log("Token: ",token)
        if(!token){
            return res.status(401).json({error:"Unauthorized- No Token provided"})
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET)

        console.log("Decode: ", decoded)
        console.log("Decoded userId",decoded.userId)

        if(!decoded){
            return res.status(401).json({error:"Unauthorized- Invalid Token"})
        }
        const user=await User.findById(decoded.userId).select("-password")
        console.log("User",user)

        if(!user){
            return res.status(401).json({error:"Unauthorized- User not found"})
        }
        req.user=user

        next()
    }
    catch(error){
        console.log("Error in protectRoute middleware", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default protectRoute
