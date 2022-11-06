import { Router } from "express";
import { auth, update } from "../controllers";

const route = Router()

route.post('/otp', auth.sendOtp)
route.post('/signup', auth.createUser)
route.post('/login/otp', auth.sendOtp)
route.post('/update/profile', update.profile)

export {route as postRoutes}