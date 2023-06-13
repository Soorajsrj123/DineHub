import mongoose from "mongoose";

const DishShema=mongoose.Schema({
    dishName:{
        type:String
    },
    description:{
        type:String
    }
    ,
    category:{
        type:String
    }
    ,
    price:{
        type:Number
    },
    classification:{
     type:String,
    },
    image:{
        public_id: {
            type: String,
          },
          url: {
            type: String,
          },
    },
    restaurantId:{
        type:Object
    }

})

export default mongoose.model('Dish',DishShema)