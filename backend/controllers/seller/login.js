import { otp } from "../consumer/otp"


export async function login(req, res){
    try {
        const {phone, otp: userOtp} = req.body

        // verify otp
        await otp.verify({body:{phone, otp:userOtp}}, res)
    } catch (error) {
        console.log(error)
        res.status(500).send("Try after sometime")
    }
}