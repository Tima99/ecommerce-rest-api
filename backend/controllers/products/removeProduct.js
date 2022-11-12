import {Types} from "mongoose"
import Product from "../../models/productModel"
import Seller from "../../models/sellerModel"
import fs from "fs"
import crypto from "crypto"
import path from "path";

export async function removeProduct(req, res){
    try {
        if(!req.credentials || req.credentials.role === 'consumer') 
            return res.status(422).send("Unauthorised Seller try to remove product.")
        
        const {id: productId} = req.body

        const deleteFromAdmin = await Seller.updateOne({phone : req.credentials.phone}, {$pull: {products: {$in : [productId]}}})

        const deleted = await Product.findByIdAndDelete({_id : Types.ObjectId(productId)})
        
        // delete image folder related to product  
        const userFolderName = crypto.createHash('md5').update(req.credentials.phone).digest('hex')
        const productFolderName = deleted.productId
        const uploadPath = path.join(__dirname, '../../uploads', userFolderName, productFolderName)

        fs.rm(uploadPath, {recursive: true, force: true}, (err)=>{
            if(err) throw err
        })

        res.send(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).send("Try After Somtime.")
    }
}