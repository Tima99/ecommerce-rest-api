import { Router } from "express";
import { signup } from "../controllers";

const route = Router()

route.post('/signup', signup.sendOtp)

export {route as postRoutes}