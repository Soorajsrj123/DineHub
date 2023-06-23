import mongoose from "mongoose";


const RatingSchema=mongoose.Schema({
        userName:{
            type:String
        },
        userId:{
         type:String
        },
        restaurantId:{
         type:String
        },
        rating:{
            type:Number
        },
        review:{
          type:String
        }
})

export default mongoose.model('Rating',RatingSchema)