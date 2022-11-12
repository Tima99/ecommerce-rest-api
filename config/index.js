import dotenv from "dotenv"
/* 
    config method returns .env (default file) content to process.env
    provide custom path of .env file as an argument example : config( {path : '/path/custom' } ) 
*/
dotenv.config()

export const { 
    PORT, 
    WEBDOMAIN, 
    DB_URL,
    TWILIO_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER,
    JWT_SECRET_KEY,
    VONAGE_API_KEY,
    VONAGE_API_SECRET
} = process.env
export * from "./global"
