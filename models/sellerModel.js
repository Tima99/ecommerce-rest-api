import mongoose from "mongoose";

const {Schema} = mongoose

const sellerSchema = new Schema({
    phone: {type : String, require: true, unique: true},
    username: {type: String, unique: true},
    products: {
        type: Array
    }
}, {timestamps: true})

const Seller = mongoose.model('Seller', sellerSchema, 'sellers')

export default Seller