import express from "express"
import authRoutes from "./routes/auth.route.js"


const app=express();


const PORT=1212;


app.use("/api/auth",authRoutes)


app.listen(PORT,()=>{console.log("Server started at PORT:",PORT)})