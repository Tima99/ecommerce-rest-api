import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import User from '../models/userModel'
import Seller from '../models/sellerModel'

export const authenticate = async(req, res) => {
    try {
        if(req.token){
            const {phone, role} = req.credentials
            let doc = null
            if(role === 'consumer'){
                doc  = await User.findOne({ phone })
                if(!doc) throw new Error('Unauthorised User try to access. Login or Create One.')
            }else if(role === 'seller'){
                doc = await Seller.findOne({phone})
                if(!doc) throw new Error('Unauthorised Seller try to access. Create or login.')
            }
            
            const user = doc.toObject()
            delete user._id
            delete user.__v
            delete user.jwt
            user.role = role
    
            res.status(200).send(user)
        }else{
            res.clearCookie('jwt')
            res.status(401).send(req.err || false)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error || 'Try after sometime')
    }
}  

const authentication = async (req , res , next) =>{
    try{
        const { jwt : acess_token} = req.cookies;
        // console.log(acess_token)
        if(!acess_token) throw new Error('Invalid User')
        
        const {phone, role} = verify(acess_token , JWT_SECRET_KEY)
        // console.log(`Authenticate phone : ${phone}`)

        if(!phone) throw new Error('Invalid Jwt')
        
        req.credentials = {phone, role}
        // console.log(req.credentials)
        req.token = acess_token;

        next();
    }
    catch(err){
        // console.log(err.message)
        req.err = err.message
        next();
    }
}

export default authentication;