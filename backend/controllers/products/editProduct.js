import Product from "../../models/productModel"
import { Types } from "mongoose";

export async function editProduct(req, res){
    try {
        if(!req.credentials || req.credentials.role === 'consumer') 
            return res.status(422).send("Unauthorised Seller try to edit product.") 

        const editProductDetails = req.body

        editProductDetails.images.push(...req.files.map(file => `/${file.filename}`))

        const editProduct = await Product.findOneAndUpdate({_id: Types.ObjectId(editProductDetails._id)}, editProductDetails, {returnDocument: 'after'})

        res.send(editProduct)

    } catch (error) {
        console.log(error);
        res.status(500).send("Try After Somtime.")
    }
}