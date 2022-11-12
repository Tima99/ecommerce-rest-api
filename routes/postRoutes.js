import { Router } from "express";
import { auth, update, createAdmin, login, addProduct, removeProduct, editProduct } from "../controllers";
import upload from "../services/multerStorage";

const route = Router()

route.post('/otp', auth.sendOtp)
route.post('/signup', auth.createUser)
route.post('/login/otp', auth.sendOtp)
route.post('/update/profile', update.profile)

// admin or seller
route.post('/create/admin', createAdmin)
route.post('/login', login)

// products
route.post('/add/product/:productId', upload.array("images"),addProduct)
route.post('/remove/product', removeProduct)
route.post('/edit/product/:productId', upload.array('add-new-images') ,editProduct)

export {route as postRoutes}