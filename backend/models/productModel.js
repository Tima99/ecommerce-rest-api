import mongoose from "mongoose"

const {Schema} = mongoose

const productSchema = new Schema({
    images:{type:Array, require: true},
    name: {type: String},
    description: {type: String},
    originalPrice: {type: Number},
    discountPrice: {type: Number, default: 0},
    priceSymbol: {type: String},
    additional: {type: String},
    productId: {type: String, unique: true, required: true, index: true}
})

const Product = mongoose.model("Product", productSchema, "products")

export default Product