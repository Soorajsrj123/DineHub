import mongoose from "mongoose";


const AdminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,

    }
})

export default mongoose.model('Admin',AdminSchema)