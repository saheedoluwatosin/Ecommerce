const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const router = require("./Router/router")


const app = express()

app.use(express.json())

mongoose.connect(`${process.env.MONGO_DB}`)
        .then(()=> {
            console.log("Mongodb Connected.....")
        })




const PORT = process.env.PORT || 8081

app.listen(PORT, ()=>{console.log("Server Running")})
                
app.use("/api",router)