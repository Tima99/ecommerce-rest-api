import { Router } from "express";
import {otp} from '../controllers'

const route = Router()

route.get('/', (req, res)=> res.send("Server started 😍😍"))

route.get('/otp/verify/:phone/:otp', otp.verify)

route.get('/*', (req, res)=> res.send("No Result 😔😔"))

export {route as getRoutes}