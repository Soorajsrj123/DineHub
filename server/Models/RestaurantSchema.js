import mongoose from "mongoose";

const RestaurantSchema = mongoose.Schema({

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
    type: Object,
  },
  tables: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  wifi: {
    type: Boolean,
    default: false,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  aircondition: {
    type: Boolean,
    default: false,
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
  status:{
    type:String,
    default:"pending"
  },
  rejectedReason:{
 type:String,
 default:""
  }
});

export default mongoose.model("Restaurant", RestaurantSchema);
