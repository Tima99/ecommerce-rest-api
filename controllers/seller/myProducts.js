import {Types} from "mongoose"
import Product from "../../models/productModel"
import Seller from "../../models/sellerModel"

export async function myProducts(req, res){
    try {
        if(!req.credentials || req.credentials.role === 'consumer') 
            return res.status(422).send("Unauthorised Seller.")     
        
        const seller = await Seller.findOne({phone: req.credentials.phone})

        const myProducts = await Product.find({"_id" : {$in : seller.products.map(p => Types.ObjectId(p))}})

        res.send(myProducts)
    } catch (error) {
        console.log(error);
        res.status(500).send("Try After Somtime.")
    }
}