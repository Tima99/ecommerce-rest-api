// [ ] check phone is valid
// if not valid send otp else save admin details to db

import Otp from "../../models/otpModel"
import Seller from "../../models/sellerModel"
import User from "../../models/userModel"
import jwtSaveToClient from "../../services/jwtSaveToClient"
import { validate } from "../../services/validate"
import { otp } from "../consumer/otp"

export async function createAdmin(req, res) {
    try {
        // if(req.credentials.role === "seller") return res.send("Seller already exists.")

        const { phone, username, otp: userOtp } = req.body

        const isPhoneValid = validate.phone(phone)
        if (!isPhoneValid) return res.status(422).send("⚠ Phone number not valid")
        if (!username) return res.status(422).send("Username not valid")

        // is seller already created account
        const sellerDoc = await Seller.findOne({ phone })
        if (sellerDoc) return res.status(500).send("Seller already exists.")

        if (!userOtp) {
            // no otp send than check user already verify their no. or not 
            const isUserExistWithPhone = await User.findOne({ phone })

            if (!isUserExistWithPhone) {
                // if phone not verified send otp first
                const otpDoc = await Otp.findOne({ phone }) || await Otp({ phone })
                const OTP = otpDoc.getOtp()

                const isSendOtp = await otp.send(phone, OTP)
                // console.log(`otp send to ${isSendOtp.to} (${isSendOtp.body})`);

                await otpDoc.save()

                return res.status(200).send("Otp sent!")
            }
        }
        else {
            // verify otp
            await otp.verify({ body: { phone, otp: userOtp } })
        }

        const createSellerDoc = await Seller({ phone, username })

        await jwtSaveToClient(createSellerDoc, { phone, role: "seller" }, res)

        const seller = await createSellerDoc.save()

        res.status(200).send(seller)

    } catch (error) {
        // console.log(error, error instanceof Error)
        res.status(500).send(error || "Try after sometime")
    }
}