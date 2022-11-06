import { Router } from "express";
import {auth, otp} from '../controllers'
import { authenticate } from "../middlewares/authenticate";

const route = Router()

route.get('/', (req, res)=> res.send("Server started 😍😍"))

route.get('/otp/verify/:phone/:otp', otp.verify)

route.get('/auth', authenticate)

route.get('/logout/:phone', auth.logout)

route.get('/*', (req, res)=> res.send("No Result 😔😔"))

export {route as getRoutes}