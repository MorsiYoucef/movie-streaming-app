import dotenv from 'dotenv'

dotenv.config()

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    SMPT_USER: process.env.SMPT_USER,
    SMPT_PASS : process.env.SMPT_PASS,
    SMPT_HOST: process.env.SMPT_HOST,
    SMPT_PORT: process.env.SMPT_PORT,
    TMDB_API_KEY: process.env.TMDB_API_KEY
}