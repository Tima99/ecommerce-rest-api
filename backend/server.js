import { PORT, DB_URL, uploadFolder } from "./config"
import express from "express"
import cookieParser from "cookie-parser"
import { getRoutes } from "./routes/getRoutes"
import { postRoutes } from "./routes/postRoutes"
import { connect } from "mongoose"
import cors from "cors"
import authentication from "./middlewares/authenticate"
import fs from 'fs'

const app = express()

const corsOptions = {
    origin : ['https://swiftstock.netlify.app', "http://localhost:3000"],
    credentials : true
}

app.use(express.static(uploadFolder))
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
// app.use(upload)
app.use('/', authentication)
app.use('/api', getRoutes)
app.use('/api', postRoutes)

// create folder where images upload
if(!fs.existsSync(uploadFolder))
    fs.mkdirSync(uploadFolder)

// start server
app.listen(PORT, err=> err ? console.log(err) : console.log(`Server Listening on http://localhost:${PORT}/api/`))

// connect to database
connect(DB_URL, err=> err ? console.log(err) : console.log("Database Connected!"))
