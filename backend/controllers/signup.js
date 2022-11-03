import Otp from "../models/otpModel"
import { validate } from "../services/validate"
import { otp } from "./otp"

export const signup = {
    sendOtp: async(req, res)=> {
        try{
            const {phone} = req.body
            const isPhoneValid = validate.phone(phone)
            if(!isPhoneValid) return res.status(422).send("⚠ Please provide valid phone number.")
    
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
    }
}