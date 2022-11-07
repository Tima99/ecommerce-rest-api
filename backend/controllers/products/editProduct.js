import Product from "../../models/productModel"
import { Types } from "mongoose";
import fs from "fs"
import crypto from "crypto"
import path from "path";
import { isArray } from "util";

export async function editProduct(req, res){
    try {
        if(!req.credentials || req.credentials.role === 'consumer') 
            return res.status(422).send("Unauthorised Seller try to edit product.") 

        const editProductDetails = req.body
        if(isArray(editProductDetails.images))
            editProductDetails.images.push(...req.files.map(file => `/${file.filename}`))
        else if(editProductDetails.images)
            editProductDetails.images = [...req.files.map(file => `/${file.filename}`), editProductDetails.images ]
        else
            editProductDetails.images = [...req.files.map(file => `/${file.filename}`) ]

        const editProduct = await Product.findOneAndUpdate({_id: Types.ObjectId(editProductDetails._id)}, editProductDetails, {returnDocument: 'after'})

        // get all images 
        const {images} = editProduct

        const userFolderName = crypto.createHash('md5').update(req.credentials.phone).digest('hex')

        const productFolderName = req.params.productId
        
        const uploadPath = path.join(__dirname, '../../uploads', userFolderName, productFolderName)
        console.log(uploadPath)
        
        // remove not required images
        fs.readdir(uploadPath, (err, files)=>{
            console.log(files)
            files.forEach(file=> {
                if(isArray(images)){
                    const isExist = images.every(path => !path.includes(file) )
                    if(isExist)
                        fs.rmSync(`${uploadPath}\\${file}`)
                }else{
                    if(!images.includes(file))
                        fs.rmSync(`${uploadPath}\\${file}`)
                }

            })
        })
        
        res.send(editProduct)

    } catch (error) {
        console.log(error);
        res.status(500).send("Try After Somtime.")
    }
}