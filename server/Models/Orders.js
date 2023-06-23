
import mongoose from "mongoose";

const OrderShema=mongoose.Schema({
    orderDetails:{
        type:Array
       },
       tableNo:{
        type:Number,   
       },
       orderType:{
        type:String
       },
       bookingAddress:{
         type:Array
       },
       userId:{
        type:mongoose.Schema.Types.ObjectId
       },
       ownerId:{
          type:mongoose.Schema.Types.ObjectId
       },
       time:{
         type:String
       },
       date:{
          type:Date
       },
       isBooked:{
          type:Boolean,
          default:false
       },
       isReserved:{
          type:Boolean,
          default:false
       }
    },
     { 
        timestamps: true
     })

     
     export default mongoose.model('Order',OrderShema)