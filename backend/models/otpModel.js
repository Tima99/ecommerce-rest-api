import mongoose from "mongoose";
import otp from "otp-generator"
import { otpLength, otpOptions } from "../config";

const { Schema } = mongoose

const otpSchema = new Schema(
    {
        phone: { type: String, require: true, unique: true },
        otp: { type: String, require: true }
    },
    { timestamps: true }
)

otpSchema.methods.getOtp = function(){
    const OTP = otp.generate(otpLength, otpOptions)
    this.otp = OTP
    return OTP
}

const Otp = mongoose.model("Otp", otpSchema, "otps")

export default Otp