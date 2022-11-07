import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config";

export default async function jwtSaveToClient(userDoc, payload ,res){
    let jwt_token;

    if(userDoc){
        const minutesToExpire = 60;
        const expiresIn = 60 * minutesToExpire;
        jwt_token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn})
        // clear and saveTo is res.cookie we passed as arg
        res.clearCookie('jwt')
        res.cookie('jwt', jwt_token, {
            expiresIn,
            httpOnly: true,
            secure: false
        })
        if(payload.role != 'seller'){
            userDoc.jwt.push(jwt_token)
            let user = await userDoc.save()
            user = user.toObject()
            delete user._id
            delete user.jwt
            delete user.__v
            
            return user
        }
    }
}