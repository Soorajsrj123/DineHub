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
    image:{
        public_id: {
            type: String,
          },
          url: {
            type: String,
          },
    },
    owner:{
        type:Object
    }

})

export default mongoose.model('Dish',DishShema)