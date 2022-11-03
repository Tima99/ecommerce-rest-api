import { PORT, DB_URL } from "./config"
import express from "express"
import cookieParser from "cookie-parser"
import { getRoutes } from "./routes/getRoutes"
import { postRoutes } from "./routes/postRoutes"
import { connect } from "mongoose"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api', getRoutes)
app.use('/api', postRoutes)

// start server
app.listen(PORT, err=> err ? console.log(err) : console.log(`Server Listening on http://localhost:${PORT}/api/`))

// connect to database
connect(DB_URL, err=> err ? console.log(err) : console.log("Database Connected!"))
