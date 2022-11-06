import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import User from '../models/userModel'

export const authenticate = async(req, res) => {
    if(req.userDocs){
        const user = req.userDocs.toObject()
        delete user._id
        delete user.__v
        delete user.jwt

        res.status(200).send(user)
    }else{
        res.clearCookie('jwt')
        res.status(401).send(req.err || false)
    }
}  

const authentication = async (req , res , next) =>{
    try{
        const { jwt : acess_token} = req.cookies;
        if(!acess_token) throw new Error('Invalid User')
        

        const {phone} = verify(acess_token , JWT_SECRET_KEY)
        // console.log(`Authenticate phone : ${phone}`)

        if(!phone) throw new Error('Invalid Jwt')
        
        const userDocs = await User.findOne({ phone })

        if(!userDocs) throw new Error('Unauthorised User try to access. Login or Create One ,first.')
        
        req.userDocs = userDocs;
        req.token = acess_token;

        next();
    }
    catch(err){
        console.log(err.message)
        req.err = err.message
        next();
    }
}

export default authentication;