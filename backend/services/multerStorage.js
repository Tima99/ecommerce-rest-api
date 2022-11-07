import multer from "multer";
import Seller from "../models/sellerModel";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        const uuid      = Date.now()+ '-' + Math.round(Math.random() * 1E9)
        const extension = file.originalname.slice(-(file.originalname.length - file.originalname.lastIndexOf('.')-1)) 
        cb(null, `${file.fieldname}-${uuid}.${extension}` )
    }
})

const upload = multer({storage})

export default upload;