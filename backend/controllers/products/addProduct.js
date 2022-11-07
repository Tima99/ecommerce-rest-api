import Product from "../../models/productModel"
import Seller from "../../models/sellerModel"

export async function addProduct(req, res){
    try {
        if(!req.credentials || req.credentials.role === 'consumer') 
            return res.status(422).send("Unauthorised Seller try to add product.") 

        const productDetails = req.body   
        
        const productDoc = new Product({
            ...productDetails,
            images: req.files.map(file => `/${file.filename}`)
        })

        const product = await productDoc.save()

        // after product created save it to its admin db
        const admin = await Seller.findOneAndUpdate(
                        { phone : req.credentials.phone }, 
                        {$push:{products: product._id.toString()}}, 
                        {returnDocument:'after'}
                    )

        res.send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send("Try After Somtime.")
    }
}