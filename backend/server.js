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

dotenv.config()

const app = express()
const PORT = ENV_VARS.PORT

app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie",protectRoute, movieRoutes)
app.use("/api/v1/tv",protectRoute, tvRoutes)
app.use("/api/v1/search",protectRoute, searchRoutes)

app.listen(5000, ()=>{
    connectDB()
    console.log(`server is listiing at the ${PORT}`)
})
