import User from "../models/userModel.js"

export const getUserForSidebar =async(req, res) => {
    try{
        const loggedInUserId=req.user
        const filteredUsers =await User.find({
            _id:{$ne:loggedInUserId}
        }).select("-password")
        res.status(200).json(filteredUsers)
    }
    catch(error){
        console.log("Error in getUserForSidebar", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}   
