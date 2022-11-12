import User from "../models/userModel";

export const update = {
    profile : async(req, res)=>{
        try{
            if(req.err) throw req.err
            
            const user = req.userDocs;

            const userDetails = req.body
            // console.log(userDetails, user)

            const userUpdatedDoc = await User.findOneAndUpdate({phone : user.phone}, userDetails, {returnDocument:'after'})

            const updatedUser = userUpdatedDoc.toObject()
            delete updatedUser.jwt
            delete updatedUser._id
            delete updatedUser.__v


            res.status(200).send(updatedUser)

        }
        catch(err){
            console.log(err)
            res.status(500).send("Try Again")
        }
    }
}