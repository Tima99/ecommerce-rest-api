import Otp from "../models/otpModel"
import { validate } from "../services/validate"
import { otp } from "./otp"
import User from "../models/userModel"
import jwtSaveToClient from "../services/jwtSaveToClient"

export const auth = {
    sendOtp: async(req, res)=> {
        try{
            const {phone, login} = req.body
            // console.log(phone)
            const isPhoneValid = validate.phone(phone)
            if(!isPhoneValid) return res.status(422).send("⚠ Please provide valid phone number.")

            const userAlreadyExists = await User.findOne({phone})
            if(userAlreadyExists && !login) return res.status(401).send('User Already Exists.Please visit Log in.')
            else if(!userAlreadyExists && login) return res.status(401).send('User not found. Create one.')

            // findOne returns null if no model found than creates new one
            // instance creates with model is known as document
            const otpDoc = await Otp.findOne({phone}) || new Otp({phone})

            // get otp
            const OTP = otpDoc.getOtp()
    
            // send message with otp to given phone number
            const isSendOtp = await otp.send(phone, OTP)
            console.log(`otp send to ${isSendOtp.to} (${isSendOtp.body})`);

            // save document
            await otpDoc.save()
            
            res.send("Otp sent sucessfully")
        }catch(err){
            console.log(err)
            res.status(500).send("Try after sometime.")
        }
    },

    createUser: async(req, res)=> {
        try {
            const user = req.body
            
            // const userAlreadyExists = await User.findOne({phone : user && user.phone})
            // if(userAlreadyExists) return res.status(401).send('User Already Exists') 
            const userDoc = new User(user)

            const userCreated = await userDoc.save()

            // if user exist set there jsonweb token
            const sendUser = await jwtSaveToClient(userCreated, res)

            res.status(200).send(sendUser)

        } catch (error) {
            console.log(error)
            res.status(500).send("Try after sometime")
        }
    },

    logout: async(req, res)=>{
        try{
            res.clearCookie('jwt')

            const {phone} = req.params
            
            console.log("Logout : "+phone)
            const userDocs = await User.findOne({phone})

            const allJwts = userDocs.jwt
            const jwt_index = allJwts.indexOf(req.token || '')
            if(jwt_index <= -1)
                return res.status(200).send("Logout")
            else{
                const removeJwt = allJwts.splice(jwt_index, 1)
                console.log(userDocs, removeJwt)
            }
            await userDocs.save()

            

            res.status(200).send("Logout sucess! You have to login again")

        }catch(err){
            console.log(err)
            res.status(401).send(err.message)
        }
    }
}