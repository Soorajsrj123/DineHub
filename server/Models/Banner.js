import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
   imageURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Banner', BannerSchema);


