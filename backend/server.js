import express from 'express'
import authRoutes from './routes/auth.route.js'
import movieRoutes from './routes/movie.route.js'
import searchRoutes from './routes/search.route.js'
import {protectRoute} from './middleware/protectRoute.js'
import tvRoutes from './routes/tv.route.js'
import dotenv from 'dotenv'
import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()

const app = express()
const PORT = ENV_VARS.PORT
const __dirname = path.resolve()

app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie",protectRoute, movieRoutes)
app.use("/api/v1/tv",protectRoute, tvRoutes)
app.use("/api/v1/search",protectRoute, searchRoutes)

if (ENV_VARS.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    });
}

app.listen(5000, ()=>{
    connectDB()
    console.log(`server is listiing at the ${PORT}`)
})
