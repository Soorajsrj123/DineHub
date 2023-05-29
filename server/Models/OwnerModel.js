import mongoose from "mongoose";

const OwnerSchema = mongoose.Schema({
  
  email: {
    type: String,
  

  },
  password: {
    type: String,
   
  },
  phone: {
    type: Number,
  },
  RestaurantId:{
    type:Object
  },
  RestaurantName:{
 type:String,
  },
  owner:{
 type:String
  },
  isBlocked:{
    type:Boolean,
    default:false
  }
});

export default mongoose.model('Owner',OwnerSchema)
