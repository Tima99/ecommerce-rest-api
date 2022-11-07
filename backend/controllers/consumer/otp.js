// import { response } from "express";
import twilio from "twilio"
import { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } from "../../config"
import Otp from "../../models/otpModel";
import Seller from "../../models/sellerModel";
import User from "../../models/userModel";
import jwtSaveToClient from "../../services/jwtSaveToClient";

export const otp = {
    async send(toPhone, OTP) {
        try {
            const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
            
            const msgId = await client.messages.create({
                body: `Verify your number! \n Your OTP is ${OTP}.`,
                from: TWILIO_NUMBER,
                to: `+ 91 ${toPhone}`
            })
            
            return msgId
        }
        catch (err) {
            return Promise.reject(`${err.message} In File ${__filename} `)
        }
    },

    async verify(req, res){
        try{
            const {phone, otp : userOtp} = req.params || req.body
            
            const otpDoc = await Otp.findOne({phone})
            if(!otpDoc) return res.status(401).send("Number not found! Try Again.")

            const {otp} = otpDoc

            // compare given otp with saved otp in database
            if(userOtp !== otp) return res.status(422).send("Wrong Otp.")

            // const deleteOtpDoc = await Otp.deleteOne({phone})

            
            // if user exist set there jsonweb token
            let payload = null, doc = null;
            if(req.params){
                doc = await User.findOne({phone}, { __v:0})
                payload = {phone : doc && doc.phone, role: 'consumer'}
            }
            else{
                doc = await Seller.findOne({phone}, { __v:0})
                payload = {phone : doc && doc.phone, role: 'seller'}
            }

            const user = await jwtSaveToClient(doc, payload ,res)
            
            if(req.params)
                res.status(200).send(user)
            else{
                if(res) return res.status(200).send(doc)
                Promise.resolve(req.sellerDoc)
            }
        }
        catch(err){
            console.log(err);
            res.status(500).send('Try after sometime')
        }
    }
}

