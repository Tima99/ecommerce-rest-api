import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    phone: {type: String, required: true, unique: true},
    name: {type: String},
    state: {type: String},
    city: {type: String},
    address: {type: String},
    jwt: {type: Array}
}, {timestamps: true})

const User = mongoose.model("User",userSchema, 'users')

export default User