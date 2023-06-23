import mongoose from "mongoose";

const RestaurantBannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle:{
    type:String
  },
  restaurantId:{
          type:String
  },
   imageURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('RestaurantBanner', RestaurantBannerSchema);


