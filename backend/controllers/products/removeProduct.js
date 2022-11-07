import {Types} from "mongoose"
import Product from "../../models/productModel"
import Seller from "../../models/sellerModel"

export async function removeProduct(req, res){
    try {
        if(!req.credentials || req.credentials.role === 'consumer') 
            return res.status(422).send("Unauthorised Seller try to remove product.")
        
        const {id: productId} = req.body

        const deleteFromAdmin = await Seller.updateOne({phone : req.credentials.phone}, {$pull: {products: {$in : [productId]}}})

        const deleted = await Product.findByIdAndDelete({_id : Types.ObjectId(productId)})

        res.send("Remove :" + productId)
    } catch (error) {
        console.log(error);
        res.status(500).send("Try After Somtime.")
    }
}