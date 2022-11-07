import { Router } from "express";
import { auth, update, createAdmin, login } from "../controllers";

const route = Router()

route.post('/otp', auth.sendOtp)
route.post('/signup', auth.createUser)
route.post('/login/otp', auth.sendOtp)
route.post('/update/profile', update.profile)

// admin or seller
route.post('/create/admin', createAdmin)
// login for seller
route.post('/login', login)

export {route as postRoutes}