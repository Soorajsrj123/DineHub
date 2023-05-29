import mongoose from "mongoose";


const RejectedRestaurantSchema=mongoose.Schema({
    owner: {
        type: Object,
      },
      ownerName: {
        type: String,
      },
      restaurantName: {
        type: String,
      },
      email:{
    type:String
      },
      address: {
        type: String,
      },
      phone: {
        type: Number,
      },
      fssc: {
        type: String,
      },
      description: {
        type: String,
      },
      image: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
      rejectedReason:{
     type:String,
     default:""
      }
})

export default mongoose.model('RejectedRestaurants',RejectedRestaurantSchema)