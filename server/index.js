import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dontenv from 'dotenv'
import admin from './Routes/admin.js'
import user from './Routes/user.js'
import owner from './Routes/owner.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app=express()

// Setting payload 10mb
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true }));


dontenv.config()

app.listen(4000,()=>{
    console.log("server starts at port 4000");
})

app.use(cookieParser())

// CORS
app.use(cors({
    origin:["http://localhost:3000"],credentials:true,origin:true
}))

app.use(morgan('combined'))

// MONGODB CONNECTION
mongoose.connect("mongodb://localhost:27017/DineOut",{
 
}).then(()=>{
    console.log("DB Connection Successfull");
}).catch(err=>{
    console.log(err.message);
})

app.use(express.json())

app.use('/',user)
app.use('/admin',admin)

app.use('/owner',owner)

