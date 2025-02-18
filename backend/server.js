import express from 'express'

const app = express()

app.use("/api/v1/auth", authRoutes)

app.listen(5000, ()=>{
    console.log(`server is listiing at the port 5000`)
})