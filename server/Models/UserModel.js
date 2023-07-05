import mongoose from "mongoose";

const UserShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,

    trim: true,
  },
  PhoneNumber: {
    type: Number,
  },
  password: {
    type: String,
  },
  imageURL: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  wallet:{
    type:Array
  }
});

export default mongoose.model("User", UserShema);
