import multer from "multer";
import fs from "fs"
import crypto from "crypto"
import {uploadFolder} from "../config"

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        const uuid      = Date.now()+ '-' + Math.round(Math.random() * 1E9)
        const extension = file.originalname.slice(-(file.originalname.length - file.originalname.lastIndexOf('.')-1)) 
        // create folder for specific user if not 
        if(!req.credentials) return
        const userFolder = crypto.createHash('md5').update(req.credentials.phone).digest('hex')

        if(!fs.existsSync(`${uploadFolder}/${userFolder}`))
            fs.mkdirSync(`${uploadFolder}/${userFolder}`)

        cb(null, `${userFolder}/${file.fieldname}-${uuid}.${extension}` )
    }
})

const upload = multer({storage})

export default upload;